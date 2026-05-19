import { Injectable, Logger } from "@nestjs/common";
import OpenAI from "openai";
import { PrismaService } from "../../prisma/prisma.service";
import { PromptLibrary } from "./prompt-library";
import { GenerateMessageDto } from "./dto/generate-message.dto";
import { GenerateContentDto } from "./dto/generate-content.dto";

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly client: OpenAI;
  private readonly model: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly prompts: PromptLibrary,
  ) {
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "missing" });
    this.model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  }

  async generateMessage(dto: GenerateMessageDto) {
    const lead = await this.prisma.lead.findUnique({ where: { id: dto.leadId } });
    if (!lead) throw new Error("Lead not found");

    const prompt = this.prompts.buildMessagePrompt({
      kind: dto.kind,
      tone: dto.tone ?? "PROFESSIONAL",
      lead,
      extraContext: dto.context,
    });

    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: "system", content: prompt.system },
        { role: "user", content: prompt.user },
      ],
      temperature: 0.7,
      max_tokens: 400,
    });

    const message = completion.choices[0]?.message?.content?.trim() ?? "";
    const tokensUsed = completion.usage?.total_tokens ?? 0;

    // Persist as draft
    await this.prisma.message.create({
      data: {
        leadId: dto.leadId,
        kind: dto.kind,
        body: message,
        aiGenerated: true,
        promptUsed: prompt.user,
        tokensUsed,
      },
    });

    return { message, tokensUsed, model: this.model };
  }

  async generateContent(dto: GenerateContentDto) {
    const prompt = this.prompts.buildContentPrompt(dto);

    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: "system", content: prompt.system },
        { role: "user", content: prompt.user },
      ],
      temperature: 0.8,
      max_tokens: 800,
    });

    return {
      body: completion.choices[0]?.message?.content?.trim() ?? "",
      tokensUsed: completion.usage?.total_tokens ?? 0,
      model: this.model,
    };
  }

  async suggestReply(conversationId: string, lastInbound: string) {
    const turns = await this.prisma.conversationTurn.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      take: 20,
    });

    const history = turns.map((t) => `${t.fromUser ? "Me" : "Them"}: ${t.body}`).join("\n");

    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: "system", content: this.prompts.replySuggestionSystem() },
        { role: "user", content: `Conversation so far:\n${history}\n\nThey just said: "${lastInbound}"\n\nSuggest a short, warm reply.` },
      ],
      temperature: 0.6,
      max_tokens: 250,
    });

    return {
      suggestion: completion.choices[0]?.message?.content?.trim() ?? "",
      tokensUsed: completion.usage?.total_tokens ?? 0,
    };
  }
}
