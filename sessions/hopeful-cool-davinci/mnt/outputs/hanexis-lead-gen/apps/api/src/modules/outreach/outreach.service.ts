import { Injectable, Logger } from "@nestjs/common";
import { MessageStatus, ActivityType } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { QueueService, QueueName } from "../../common/queue/queue.service";

@Injectable()
export class OutreachService {
  private readonly logger = new Logger(OutreachService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly queue: QueueService,
  ) {}

  history(leadId?: string) {
    return this.prisma.message.findMany({
      where: leadId ? { leadId } : {},
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { lead: { select: { fullName: true, company: true } } },
    });
  }

  approve(id: string) {
    return this.prisma.message.update({ where: { id }, data: { status: MessageStatus.APPROVED } });
  }

  reject(id: string) {
    return this.prisma.message.update({ where: { id }, data: { status: MessageStatus.FAILED } });
  }

  async send(messageId: string, scheduledAt?: Date) {
    const msg = await this.prisma.message.findUnique({ where: { id: messageId } });
    if (!msg) throw new Error("Message not found");

    if (scheduledAt && scheduledAt > new Date()) {
      const delay = scheduledAt.getTime() - Date.now();
      await this.queue.addJob(QueueName.OUTREACH, "send", { messageId }, delay);
      return this.prisma.message.update({
        where: { id: messageId },
        data: { status: MessageStatus.SCHEDULED, scheduledAt },
      });
    }

    await this.queue.addJob(QueueName.OUTREACH, "send", { messageId });
    return this.prisma.message.update({
      where: { id: messageId },
      data: { status: MessageStatus.SCHEDULED },
    });
  }

  async markSent(messageId: string) {
    const msg = await this.prisma.message.update({
      where: { id: messageId },
      data: { status: MessageStatus.SENT, sentAt: new Date() },
      include: { lead: true },
    });
    await this.prisma.activity.create({
      data: {
        userId: msg.lead.userId,
        leadId: msg.leadId,
        type: ActivityType.MESSAGE_SENT,
        payload: { messageId },
      },
    });
    return msg;
  }
}
