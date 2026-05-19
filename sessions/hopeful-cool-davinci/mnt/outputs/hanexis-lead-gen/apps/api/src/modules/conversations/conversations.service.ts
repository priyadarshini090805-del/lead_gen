import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ConversationsService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.conversation.findMany({
      where: { userId },
      orderBy: { lastMessageAt: "desc" },
      include: {
        lead: { select: { fullName: true, company: true, platform: true } },
        turns: { take: 1, orderBy: { createdAt: "desc" } },
      },
    });
  }

  findById(id: string) {
    return this.prisma.conversation.findUnique({
      where: { id },
      include: { lead: true, turns: { orderBy: { createdAt: "asc" } } },
    });
  }

  async addTurn(conversationId: string, body: string, fromUser: boolean) {
    const turn = await this.prisma.conversationTurn.create({
      data: { conversationId, body, fromUser },
    });
    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date(), unreadCount: fromUser ? 0 : { increment: 1 } },
    });
    return turn;
  }
}
