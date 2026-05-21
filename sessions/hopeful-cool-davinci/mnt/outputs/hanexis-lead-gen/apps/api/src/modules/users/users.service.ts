import {
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";

import * as bcrypt from "bcryptjs";

import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: {
    name: string;
    email: string;
    password: string;
  }) {

    const existing = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existing) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      10,
    );

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return {
      message: "User created",
      user,
    };
  }

  async login(data: {
    email: string;
    password: string;
  }) {

    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        "Invalid credentials",
      );
    }

    const valid = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!valid) {
      throw new UnauthorizedException(
        "Invalid credentials",
      );
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      access_token: token,
      user,
    };
  }

  async findAll() {

    return this.prisma.user.findMany();
  }

  async findOne(id: string) {

    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}