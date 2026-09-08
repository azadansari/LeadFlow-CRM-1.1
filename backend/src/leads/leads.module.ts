import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { LeadActivitiesModule } from "../lead-activities/lead-activities.module";

@Module({
  imports: [LeadActivitiesModule],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
