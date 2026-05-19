import { PrismaClient, Platform, LeadStatus, MessageKind, MessageStatus, ContentKind, ContentStatus, UserRole } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const passwordHash = await argon2.hash("Password123!");

  const admin = await prisma.user.upsert({
    where: { email: "admin@hanexis.com" },
    update: {},
    create: {
      email: "admin@hanexis.com",
      passwordHash,
      fullName: "Hanexis Admin",
      role: UserRole.ADMIN,
      emailVerified: true,
    },
  });

  const sampleLeads = [
    { fullName: "Sarah Chen", company: "Acme Corp", title: "VP Marketing", platform: Platform.LINKEDIN, status: LeadStatus.NEW, tags: ["SaaS", "B2B"] },
    { fullName: "Marcus Johnson", company: "Loop Studios", title: "CTO", platform: Platform.LINKEDIN, status: LeadStatus.CONTACTED, tags: ["Tech"] },
    { fullName: "Priya Patel", company: "Northstar Health", title: "Head of Growth", platform: Platform.INSTAGRAM, status: LeadStatus.REPLIED, tags: ["Healthcare"] },
    { fullName: "Diego Alvarez", company: "Vela Logistics", title: "CEO", platform: Platform.LINKEDIN, status: LeadStatus.QUALIFIED, tags: ["Logistics"] },
    { fullName: "Hana Yamamoto", company: "Studio Mori", title: "Creative Director", platform: Platform.INSTAGRAM, status: LeadStatus.CONVERTED, tags: ["Design"] },
  ];

  for (const lead of sampleLeads) {
    await prisma.lead.create({
      data: {
        ...lead,
        userId: admin.id,
        email: `${lead.fullName.split(" ")[0].toLowerCase()}@example.com`,
        score: Math.floor(Math.random() * 100),
      },
    });
  }

  console.log(`Seeded: 1 user, ${sampleLeads.length} leads`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
