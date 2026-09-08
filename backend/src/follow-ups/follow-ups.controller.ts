import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { FollowUpsService } from "./follow-ups.service";

@Controller("follow-ups")
export class FollowUpsController {
  constructor(
    private readonly followUpsService: FollowUpsService,
  ) {}

  @Get()
  findAll() {
    return this.followUpsService.findAll();
  }

  @Get("lead/:leadId")
  findByLeadId(
    @Param("leadId") leadId: string,
  ) {
    return this.followUpsService.findByLeadId(
      leadId,
    );
  }

  @Post()
  create(
    @Body()
    body: {
      leadId: string;
      type: string;
      dueAt: string;
      note?: string;
    },
  ) {
    return this.followUpsService.create(body);
  }

  @Patch(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body()
    body: {
      status: string;
    },
  ) {
    return this.followUpsService.updateStatus(
      id,
      body.status,
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.followUpsService.remove(id);
  }
}