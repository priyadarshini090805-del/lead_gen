import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Platform } from "@prisma/client";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { IntegrationsService } from "./integrations.service";

@ApiTags("integrations")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("integrations")
export class IntegrationsController {
  constructor(private readonly integrations: IntegrationsService) {}

  @Get()
  list(@Req() req: any) {
    return this.integrations.list(req.user.userId);
  }

  @Post(":platform/connect")
  connect(@Req() req: any, @Param("platform") platform: Platform, @Body() tokens: any) {
    return this.integrations.upsert(req.user.userId, platform, tokens);
  }

  @Delete(":platform")
  disconnect(@Req() req: any, @Param("platform") platform: Platform) {
    return this.integrations.disconnect(req.user.userId, platform);
  }

  @Post("webhook/:platform")
  webhook(@Param("platform") platform: Platform, @Body() payload: any) {
    return this.integrations.handleWebhook(platform, payload);
  }
}
