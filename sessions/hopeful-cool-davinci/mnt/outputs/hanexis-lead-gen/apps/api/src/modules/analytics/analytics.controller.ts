import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AnalyticsService } from "./analytics.service";

@ApiTags("analytics")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  @Get("kpis")
  kpis(@Req() req: any) {
    return this.analytics.kpis(req.user.userId);
  }

  @Get("funnel")
  funnel(@Req() req: any) {
    return this.analytics.funnel(req.user.userId);
  }

  @Get("timeseries")
  timeseries(@Req() req: any, @Query("days") days?: string) {
    return this.analytics.timeseries(req.user.userId, parseInt(days ?? "30", 10));
  }

  @Get("platform-breakdown")
  platformBreakdown(@Req() req: any) {
    return this.analytics.platformBreakdown(req.user.userId);
  }
}
