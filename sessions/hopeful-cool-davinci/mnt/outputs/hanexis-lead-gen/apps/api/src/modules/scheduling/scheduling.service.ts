import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ContentStatus } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { QueueService, QueueName } from "../../common/queue/queue.service";

@Injectable()
export class SchedulingService {
  private readonly logger = new Logger(SchedulingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly queue: QueueService,
  ) {}

  async calendar(userId: string, from: Date, to: Date) {
    const [content, messages] = await Promise.all([
      this.prisma.content.findMany({
        where: { userId, scheduledAt: { gte: from, lte: to } },
        orderBy: { scheduledAt: "asc" },
      }),
      this.prisma.message.findMany({
        where: { scheduledAt: { gte: from, lte: to }, lead: { userId } },
        orderBy: { scheduledAt: "asc" },
        include: { lead: { select: { fullName: true } } },
      }),
    ]);
    return { content, messages };
  }

  async scheduleContent(contentId: string, scheduledAt: Date, timezone?: string) {
    const delay = Math.max(0, scheduledAt.getTime() - Date.now());
    await this.queue.addJob(QueueName.CONTENT, "publish", { contentId, timezone }, delay);
    return this.prisma.content.update({
      where: { id: contentId },
      data: { status: ContentStatus.SCHEDULED, scheduledAt },
    });
  }

  // Sweep: catch anything that missed its scheduled window
  @Cron(CronExpression.EVERY_5_MINUTES)
  async sweepScheduled() {
    const overdue = await this.prisma.content.findMany({
      where: { status: ContentStatus.SCHEDULED, scheduledAt: { lte: new Date() } },
      take: 50,
    });
    for (const c of overdue) {
      await this.queue.addJob(QueueName.CONTENT, "publish", { contentId: c.id });
    }
    if (overdue.length) this.logger.log(`Swept ${overdue.length} overdue content items`);
  }
}
