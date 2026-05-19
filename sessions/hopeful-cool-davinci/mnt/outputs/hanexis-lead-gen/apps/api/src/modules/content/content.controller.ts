import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ContentService } from "./content.service";

@ApiTags("content")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("content")
export class ContentController {
  constructor(private readonly content: ContentService) {}

  @Get()
  list(@Req() req: any) {
    return this.content.list(req.user.userId);
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.content.findById(id);
  }

  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.content.create(req.user.userId, body);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.content.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.content.remove(id);
  }

  @Patch(":id/approve")
  approve(@Param("id") id: string) {
    return this.content.approve(id);
  }
}
