import { IsEnum, IsOptional, IsString } from "class-validator";
import { ContentKind, Platform } from "@prisma/client";

export class GenerateContentDto {
  @IsEnum(ContentKind)
  kind!: ContentKind;

  @IsString()
  topic!: string;

  @IsOptional() @IsEnum(Platform)
  platform?: Platform;

  @IsOptional() @IsString()
  audience?: string;
}
