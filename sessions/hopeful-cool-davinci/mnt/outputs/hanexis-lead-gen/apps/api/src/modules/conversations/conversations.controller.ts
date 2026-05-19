import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ConversationsService } from "./conversations.service";

@ApiTags("conversations")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("conversations")
export class ConversationsController {
  constructor(private readonly convos: ConversationsService) {}

  @Get()
  list(@Req() req: any) {
    return this.convos.list(req.user.userId);
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.convos.findById(id);
  }

  @Post(":id/turns")
  addTurn(@Param("id") id: string, @Body() body: { body: string; fromUser: boolean }) {
    return this.convos.addTurn(id, body.body, body.fromUser);
  }
}
