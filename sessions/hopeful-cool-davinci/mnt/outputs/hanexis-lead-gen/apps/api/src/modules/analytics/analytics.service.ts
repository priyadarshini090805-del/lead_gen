import { Injectable } from "@nestjs/common";
import { LeadStatus, MessageStatus } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async kpis(userId: string) {
    const [leads, messagesSent, replies, conversions] = await Promise.all([
      this.prisma.lead.count({ where: { userId } }),
      this.prisma.message.count({ where: { lead: { userId }, status: MessageStatus.SENT } }),
      this.prisma.lead.count({ where: { userId, status: { in: [LeadStatus.REPLIED, LeadStatus.QUALIFIED, LeadStatus.CONVERTED] } } }),
      this.prisma.lead.count({ where: { userId, status: LeadStatus.CONVERTED } }),
    ]);
    return {
      leads,
      messagesSent,
      replies,
      conversions,
      replyRate: messagesSent ? +(replies / messagesSent * 100).toFixed(1) : 0,
      conversionRate: leads ? +(conversions / leads * 100).toFixed(1) : 0,
    };
  }

  async funnel(userId: string) {
    const statuses: LeadStatus[] = [LeadStatus.NEW, LeadStatus.CONTACTED, LeadStatus.REPLIED, LeadStatus.QUALIFIED, LeadStatus.CONVERTED];
    const counts = await Promise.all(
      statuses.map((status) => this.prisma.lead.count({ where: { userId, status } })),
    );
    return statuses.map((status, i) => ({ status, count: counts[i] }));
  }

  async timeseries(userId: string, days = 30) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const rows = await this.prisma.$queryRaw<Array<{ date: Date; count: number }>>`
      SELECT date_trunc('day', "createdAt") as date, count(*)::int as count
      FROM "leads"
      WHERE "userId" = ${userId} AND "createdAt" >= ${since}
      GROUP BY 1 ORDER BY 1 ASC
    `;
    return rows.map((r) => ({ date: r.date, count: Number(r.count) }));
  }

  async platformBreakdown(userId: string) {
    const rows = await this.prisma.lead.groupBy({
      by: ["platform"],
      where: { userId },
      _count: true,
    });
    return rows.map((r) => ({ platform: r.platform, count: r._count }));
  }
}
