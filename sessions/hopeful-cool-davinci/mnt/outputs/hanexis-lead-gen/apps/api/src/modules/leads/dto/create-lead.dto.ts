import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { Platform, LeadStatus } from "@prisma/client";

export class CreateLeadDto {
  @IsString()
  fullName!: string;

  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() company?: string;
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() industry?: string;
  @IsOptional() @IsString() location?: string;

  @IsEnum(Platform)
  platform!: Platform;

  @IsOptional() @IsString() profileUrl?: string;

  @IsOptional() @IsArray()
  tags?: string[];

  @IsOptional() @IsEnum(LeadStatus)
  status?: LeadStatus;
}
