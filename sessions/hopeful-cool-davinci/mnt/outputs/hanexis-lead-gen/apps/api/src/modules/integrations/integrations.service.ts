import { Injectable, Logger } from "@nestjs/common";
import { Platform, ActivityType } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class IntegrationsService {
  private readonly logger = new Logger(IntegrationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.integration.findMany({ where: { userId } });
  }

  async upsert(userId: string, platform: Platform, tokens: { accessToken: string; refreshToken?: string; expiresAt?: string; scope?: string }) {
    const integration = await this.prisma.integration.upsert({
      where: { userId_platform: { userId, platform } },
      create: {
        userId,
        platform,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: tokens.expiresAt ? new Date(tokens.expiresAt) : null,
        scope: tokens.scope,
      },
      update: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: tokens.expiresAt ? new Date(tokens.expiresAt) : null,
        scope: tokens.scope,
        isActive: true,
      },
    });
    await this.prisma.activity.create({
      data: { userId, type: ActivityType.INTEGRATION_CONNECTED, payload: { platform } },
    });
    return integration;
  }

  disconnect(userId: string, platform: Platform) {
    return this.prisma.integration.update({
      where: { userId_platform: { userId, platform } },
      data: { isActive: false },
    });
  }

  async handleWebhook(platform: Platform, payload: any) {
    this.logger.log(`Webhook received from ${platform}: ${JSON.stringify(payload).slice(0, 200)}`);
    // TODO: route to platform-specific handler
    return { received: true };
  }
}
