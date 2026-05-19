import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AiService } from "./ai.service";
import { GenerateMessageDto } from "./dto/generate-message.dto";
import { GenerateContentDto } from "./dto/generate-content.dto";

@ApiTags("ai")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("ai")
export class AiController {
  constructor(private readonly ai: AiService) {}

  @Post("generate-message")
  generateMessage(@Body() dto: GenerateMessageDto) {
    return this.ai.generateMessage(dto);
  }

  @Post("generate-content")
  generateContent(@Body() dto: GenerateContentDto) {
    return this.ai.generateContent(dto);
  }

  @Post("suggest-reply")
  suggestReply(@Body() body: { conversationId: string; lastInbound: string }) {
    return this.ai.suggestReply(body.conversationId, body.lastInbound);
  }
}
