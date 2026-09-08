import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from "@nestjs/common";

import { LeadActivitiesService } from "./lead-activities.service";

@Controller("lead-activities")
export class LeadActivitiesController {
  constructor(
    private readonly leadActivitiesService: LeadActivitiesService,
  ) {}

  @Get(":leadId")
  findByLeadId(@Param("leadId") leadId: string) {
    return this.leadActivitiesService.findByLeadId(leadId);
  }

  @Post()
  create(
    @Body()
    body: {
      leadId: string;
      type: string;
      title: string;
      description?: string;
    },
  ) {
    return this.leadActivitiesService.create(body);
  }
}