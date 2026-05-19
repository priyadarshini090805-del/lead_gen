import { Injectable } from "@nestjs/common";
import { ContentStatus } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.content.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
  }

  findById(id: string) {
    return this.prisma.content.findUnique({ where: { id } });
  }

  create(userId: string, data: any) {
    return this.prisma.content.create({ data: { ...data, userId } });
  }

  update(id: string, data: any) {
    return this.prisma.content.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.content.delete({ where: { id } });
  }

  approve(id: string) {
    return this.prisma.content.update({ where: { id }, data: { status: ContentStatus.APPROVED } });
  }
}
