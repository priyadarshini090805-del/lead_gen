import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { SchedulingService } from "./scheduling.service";

@ApiTags("scheduling")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("scheduling")
export class SchedulingController {
  constructor(private readonly scheduling: SchedulingService) {}

  @Get("calendar")
  calendar(@Req() req: any, @Query("from") from: string, @Query("to") to: string) {
    return this.scheduling.calendar(req.user.userId, new Date(from), new Date(to));
  }

  @Post("schedule-content")
  scheduleContent(@Body() body: { contentId: string; scheduledAt: string; timezone?: string }) {
    return this.scheduling.scheduleContent(body.contentId, new Date(body.scheduledAt), body.timezone);
  }
}
