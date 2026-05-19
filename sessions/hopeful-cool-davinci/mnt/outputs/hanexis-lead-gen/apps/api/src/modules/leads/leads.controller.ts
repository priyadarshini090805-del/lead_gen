import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { LeadsService } from "./leads.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";
import { QueryLeadsDto } from "./dto/query-leads.dto";

@ApiTags("leads")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("leads")
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Get()
  list(@Req() req: any, @Query() query: QueryLeadsDto) {
    return this.leads.list(req.user.userId, query);
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.leads.findById(id);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateLeadDto) {
    return this.leads.create(req.user.userId, dto);
  }

  @Post("import")
  bulkImport(@Req() req: any, @Body() body: { leads: CreateLeadDto[] }) {
    return this.leads.bulkImport(req.user.userId, body.leads);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateLeadDto) {
    return this.leads.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.leads.remove(id);
  }
}
