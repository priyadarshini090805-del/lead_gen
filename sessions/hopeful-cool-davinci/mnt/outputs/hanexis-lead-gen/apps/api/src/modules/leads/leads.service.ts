import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";
import { QueryLeadsDto } from "./dto/query-leads.dto";

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string, q: QueryLeadsDto) {
    const where: Prisma.LeadWhereInput = { userId };
    if (q.status) where.status = q.status;
    if (q.platform) where.platform = q.platform;
    if (q.search)
      where.OR = [
        { fullName: { contains: q.search, mode: "insensitive" } },
        { company: { contains: q.search, mode: "insensitive" } },
        { email: { contains: q.search, mode: "insensitive" } },
      ];
    if (q.tag) where.tags = { has: q.tag };

    const page = q.page ?? 1;
    const limit = q.limit ?? 20;

    const [items, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: "desc" },
      }),
      this.prisma.lead.count({ where }),
    ]);

    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findById(id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: { messages: { orderBy: { createdAt: "desc" }, take: 10 } },
    });
    if (!lead) throw new NotFoundException("Lead not found");
    return lead;
  }

  create(userId: string, dto: CreateLeadDto) {
    return this.prisma.lead.create({ data: { ...dto, userId } });
  }

  bulkImport(userId: string, leads: CreateLeadDto[]) {
    return this.prisma.lead.createMany({
      data: leads.map((l) => ({ ...l, userId })),
      skipDuplicates: true,
    });
  }

  update(id: string, dto: UpdateLeadDto) {
    return this.prisma.lead.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.lead.delete({ where: { id } });
  }
}
