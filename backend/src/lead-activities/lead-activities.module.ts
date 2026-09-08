import { Module } from "@nestjs/common";

import { LeadActivitiesController } from "./lead-activities.controller";
import { LeadActivitiesService } from "./lead-activities.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [LeadActivitiesController],
  providers: [
    LeadActivitiesService,
    PrismaService,
  ],
  exports: [LeadActivitiesService],
})
export class LeadActivitiesModule {}