import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from "@nestjs/common";

import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  async findOne(
    @Param("id") id: string,
  ) {
    return this.usersService.findOne(id);
  }

  @Post("register")
  async register(
    @Body() body: any,
  ) {
    return this.usersService.register(body);
  }

  @Post("login")
  async login(
    @Body() body: any,
  ) {

    return this.usersService.login(
      body.email,
      body.password,
    );
  }
}