import { Injectable } from "@nestjs/common";
import { Lead, MessageKind } from "@prisma/client";

interface MessagePromptInput {
  kind: MessageKind;
  tone: "PROFESSIONAL" | "CASUAL" | "FRIENDLY";
  lead: Lead;
  extraContext?: string;
}

@Injectable()
export class PromptLibrary {
  buildMessagePrompt(input: MessagePromptInput): { system: string; user: string } {
    const { kind, tone, lead, extraContext } = input;

    const system = `You are an expert B2B social-selling copywriter. Write in a ${tone.toLowerCase()} tone, under 80 words, no emojis, no buzzwords. Mention something specific to the lead.`;

    const leadCtx = [
      lead.fullName && `Name: ${lead.fullName}`,
      lead.title && `Title: ${lead.title}`,
      lead.company && `Company: ${lead.company}`,
      lead.industry && `Industry: ${lead.industry}`,
      lead.platform && `Platform: ${lead.platform}`,
    ].filter(Boolean).join("\n");

    const user = `Generate a ${this.label(kind)} for this lead:\n${leadCtx}${extraContext ? `\n\nExtra context: ${extraContext}` : ""}`;

    return { system, user };
  }

  buildContentPrompt(input: { kind: string; topic: string; platform?: string; audience?: string }): { system: string; user: string } {
    const system = `You are a top-tier social media content creator. Write engaging, scroll-stopping content. Use line breaks for readability.`;
    const user = `Create a ${input.kind} about: "${input.topic}".\n${input.platform ? `Platform: ${input.platform}\n` : ""}${input.audience ? `Target audience: ${input.audience}` : ""}`;
    return { system, user };
  }

  replySuggestionSystem(): string {
    return "You are an empathetic, professional reply assistant. Suggest one short, natural-sounding reply (1-3 sentences). Match the tone of the conversation.";
  }

  private label(kind: MessageKind): string {
    return {
      CONNECTION: "connection request message",
      FOLLOW_UP: "follow-up message",
      SALES_PITCH: "sales pitch message",
    }[kind];
  }
}
