import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";
import { LeadActivitiesService } from "../lead-activities/lead-activities.service";

@Injectable()
export class LeadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly leadActivitiesService: LeadActivitiesService,
  ) { }
  async findAll(options: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const page = Math.max(options.page || 1, 1);
    const limit = Math.min(
      Math.max(options.limit || 20, 1),
      100,
    );
    const skip = (page - 1) * limit;
    const allowedSortFields = [
      "name",
      "phone",
      "email",
      "status",
      "source",
      "createdAt",
    ];

    const sortField = allowedSortFields.includes(
      options.sortBy || ""
    )
      ? options.sortBy!
      : "createdAt";

    const sortDirection =
      options.sortOrder === "asc"
        ? "asc"
        : "desc";
    const where: any = {};
    if (options.search?.trim()) {
      const search = options.search.trim();
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }
    if (options.status && options.status !== "all") {
      where.status = options.status;
    }
    const [data, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        orderBy: {
          [sortField]: sortDirection,
        },
        skip,
        take: limit,
      }),
      this.prisma.lead.count({
        where,
      }),
    ]);
    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  async getStats() {
    const today = new Date();
    const startOfToday = new Date(today);
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);
    const [
      totalLeads,
      todaysLeads,
      converted,
      contacted,
    ] = await Promise.all([
      this.prisma.lead.count(),

      this.prisma.lead.count({
        where: {
          createdAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
      }),
      this.prisma.lead.count({
        where: {
          status: "Converted",
        },
      }),
      this.prisma.lead.count({
        where: {
          status: "Contacted",
        },
      }),
    ]);
    return {
      totalLeads,
      todaysLeads,
      followUps: contacted,
      converted,
    };
  }
  async getStatusOverview() {
    const statuses = [
      "New",
      "Contacted",
      "Qualified",
      "Converted",
      "Lost",
    ];

    const results = await Promise.all(
      statuses.map(async (status) => {
        const count = await this.prisma.lead.count({
          where: {
            status,
          },
        });

        return {
          status,
          count,
        };
      }),
    );
    return results;
  }
  async findOne(id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
    });
    if (!lead) {
      throw new NotFoundException(
        `Lead with ID ${id} not found`,
      );
    }
    return lead;
  }
  async create(data: CreateLeadDto) {
    try {
      const lead = await this.prisma.lead.create({
        data: {
          name: data.name,
          phone: data.phone,
          email: data.email ?? null,
          status: data.status,
          source: data.source,
        },
      });

      await this.leadActivitiesService.create({
        leadId: lead.id,
        type: "created",
        title: "Lead Created",
        description: `Lead ${lead.name} was created.`,
      });

      return lead;
    } catch (error: any) {
      if (error?.code === "P2002") {
        throw new ConflictException(
          "A lead with this phone number already exists.",
        );
      }

      throw error;
    }
  }
async update(id: string, data: UpdateLeadDto) {
  const existingLead = await this.prisma.lead.findUnique({
    where: { id },
  });

  if (!existingLead) {
    throw new NotFoundException(
      `Lead with ID ${id} not found`,
    );
  }

  try {
    const updatedLead = await this.prisma.lead.update({
      where: { id },
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email ?? null,
        status: data.status,
        source: data.source,
      },
    });

    const activities: Array<{
      type: string;
      title: string;
      description: string;
    }> = [];

    if (existingLead.status !== updatedLead.status) {
      activities.push({
        type: "status_changed",
        title: "Status Changed",
        description: `${existingLead.status} → ${updatedLead.status}`,
      });
    }

    if (existingLead.name !== updatedLead.name) {
      activities.push({
        type: "updated",
        title: "Lead Name Updated",
        description: `${existingLead.name} → ${updatedLead.name}`,
      });
    }

    if (existingLead.phone !== updatedLead.phone) {
      activities.push({
        type: "updated",
        title: "Phone Number Updated",
        description: `${existingLead.phone} → ${updatedLead.phone}`,
      });
    }

    if (existingLead.email !== updatedLead.email) {
      activities.push({
        type: "updated",
        title: "Email Updated",
        description: `${existingLead.email || "-"} → ${
          updatedLead.email || "-"
        }`,
      });
    }

    if (existingLead.source !== updatedLead.source) {
      activities.push({
        type: "updated",
        title: "Lead Source Updated",
        description: `${existingLead.source} → ${updatedLead.source}`,
      });
    }

    for (const activity of activities) {
      await this.leadActivitiesService.create({
        leadId: updatedLead.id,
        type: activity.type,
        title: activity.title,
        description: activity.description,
      });
    }

    return updatedLead;
  } catch (error: any) {
    if (error?.code === "P2002") {
      throw new ConflictException(
        "A lead with this phone number already exists.",
      );
    }

    throw error;
  }
}
  async remove(id: string) {
    const existingLead = await this.prisma.lead.findUnique({
      where: { id },
    });
    if (!existingLead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    await this.prisma.lead.delete({
      where: { id },
    });
    return {
      message: "Lead deleted successfully",
    };
  }
}