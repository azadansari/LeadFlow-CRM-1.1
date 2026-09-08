import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsModule } from './leads/leads.module';
import { PrismaModule } from './prisma/prisma.module';
import { LeadActivitiesModule } from "./lead-activities/lead-activities.module";
import { FollowUpsModule } from "./follow-ups/follow-ups.module";

@Module({
  imports: [LeadsModule,PrismaModule,LeadActivitiesModule,FollowUpsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
