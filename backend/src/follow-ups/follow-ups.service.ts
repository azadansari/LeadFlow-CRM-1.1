import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FollowUpsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findByLeadId(leadId: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      throw new NotFoundException(
        `Lead with ID ${leadId} not found`,
      );
    }

    return this.prisma.followUp.findMany({
      where: {
        leadId,
      },
      orderBy: {
        dueAt: "asc",
      },
    });
  }

  async findAll() {
    return this.prisma.followUp.findMany({
      orderBy: {
        dueAt: "asc",
      },
      include: {
        lead: true,
      },
    });
  }

  async create(data: {
    leadId: string;
    type: string;
    dueAt: string;
    note?: string;
  }) {
    const lead = await this.prisma.lead.findUnique({
      where: {
        id: data.leadId,
      },
    });

    if (!lead) {
      throw new NotFoundException(
        `Lead with ID ${data.leadId} not found`,
      );
    }

    return this.prisma.followUp.create({
      data: {
        leadId: data.leadId,
        type: data.type,
        dueAt: new Date(data.dueAt),
        note: data.note ?? null,
      },
    });
  }

  async updateStatus(
    id: string,
    status: string,
  ) {
    const followUp =
      await this.prisma.followUp.findUnique({
        where: { id },
      });

    if (!followUp) {
      throw new NotFoundException(
        `Follow-up with ID ${id} not found`,
      );
    }

    return this.prisma.followUp.update({
      where: { id },
      data: {
        status,
      },
    });
  }

  async remove(id: string) {
    const followUp =
      await this.prisma.followUp.findUnique({
        where: { id },
      });

    if (!followUp) {
      throw new NotFoundException(
        `Follow-up with ID ${id} not found`,
      );
    }

    await this.prisma.followUp.delete({
      where: { id },
    });

    return {
      message: "Follow-up deleted successfully",
    };
  }
}