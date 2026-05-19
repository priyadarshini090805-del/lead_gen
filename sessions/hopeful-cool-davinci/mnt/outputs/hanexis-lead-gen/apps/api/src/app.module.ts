import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { ScheduleModule } from "@nestjs/schedule";
import { APP_GUARD } from "@nestjs/core";

import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { LeadsModule } from "./modules/leads/leads.module";
import { AiModule } from "./modules/ai/ai.module";
import { OutreachModule } from "./modules/outreach/outreach.module";
import { ContentModule } from "./modules/content/content.module";
import { SchedulingModule } from "./modules/scheduling/scheduling.module";
import { ConversationsModule } from "./modules/conversations/conversations.module";
import { IntegrationsModule } from "./modules/integrations/integrations.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { QueueModule } from "./common/queue/queue.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
    ScheduleModule.forRoot(),
    PrismaModule,
    QueueModule,
    AuthModule,
    UsersModule,
    LeadsModule,
    AiModule,
    OutreachModule,
    ContentModule,
    SchedulingModule,
    ConversationsModule,
    IntegrationsModule,
    AnalyticsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
