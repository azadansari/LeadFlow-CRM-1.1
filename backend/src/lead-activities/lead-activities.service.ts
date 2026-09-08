import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LeadActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findByLeadId(leadId: string) {
    return this.prisma.leadActivity.findMany({
      where: {
        leadId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(data: {
    leadId: string;
    type: string;
    title: string;
    description?: string;
  }) {
    return this.prisma.leadActivity.create({
      data: {
        leadId: data.leadId,
        type: data.type,
        title: data.title,
        description: data.description ?? null,
      },
    });
  }
}