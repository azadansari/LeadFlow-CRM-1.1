import { Module } from "@nestjs/common";

import { FollowUpsController } from "./follow-ups.controller";
import { FollowUpsService } from "./follow-ups.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [FollowUpsController],
  providers: [
    FollowUpsService,
    PrismaService,
  ],
  exports: [FollowUpsService],
})
export class FollowUpsModule {}