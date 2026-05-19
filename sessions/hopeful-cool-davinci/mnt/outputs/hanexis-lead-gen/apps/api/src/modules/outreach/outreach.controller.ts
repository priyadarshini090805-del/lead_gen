import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { OutreachService } from "./outreach.service";

@ApiTags("outreach")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("outreach")
export class OutreachController {
  constructor(private readonly outreach: OutreachService) {}

  @Get("history")
  history(@Query("leadId") leadId?: string) {
    return this.outreach.history(leadId);
  }

  @Patch(":id/approve")
  approve(@Param("id") id: string) {
    return this.outreach.approve(id);
  }

  @Patch(":id/reject")
  reject(@Param("id") id: string) {
    return this.outreach.reject(id);
  }

  @Post("send")
  send(@Body() body: { messageId: string; scheduledAt?: string }) {
    return this.outreach.send(body.messageId, body.scheduledAt ? new Date(body.scheduledAt) : undefined);
  }
}
