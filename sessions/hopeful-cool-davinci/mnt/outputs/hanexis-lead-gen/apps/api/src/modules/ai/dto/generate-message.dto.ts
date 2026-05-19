import { IsEnum, IsOptional, IsString } from "class-validator";
import { MessageKind } from "@prisma/client";

export class GenerateMessageDto {
  @IsString()
  leadId!: string;

  @IsEnum(MessageKind)
  kind!: MessageKind;

  @IsOptional()
  @IsString()
  tone?: "PROFESSIONAL" | "CASUAL" | "FRIENDLY";

  @IsOptional()
  @IsString()
  context?: string;
}
