import { Body, Controller, Delete, Get, Param, Patch, Post, Query, } from "@nestjs/common";
import { LeadsService } from "./leads.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";
@Controller("leads")
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) { }
  @Get()
  @Get()
  findAll(
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("search") search?: string,
    @Query("status") status?: string,
    @Query("sortBy") sortBy?: string,
    @Query("sortOrder") sortOrder?: string,
  ) {
    return this.leadsService.findAll({
      page: Number(page) || 1,
      limit: Number(limit) || 20,
      search,
      status,
      sortBy,
      sortOrder,
    });
  }
  @Get("stats")
  getStats() {
    return this.leadsService.getStats();
  }
  @Get("status-overview")
  getStatusOverview() {
    return this.leadsService.getStatusOverview();
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.leadsService.findOne(id);
  }
  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateLeadDto: UpdateLeadDto,
  ) {
    return this.leadsService.update(id, updateLeadDto);
  }
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.leadsService.remove(id);
  }
}