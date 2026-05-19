import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("refresh")
  refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refresh(body.refreshToken);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  me(@Req() req: any) {
    return req.user;
  }

  // ===== OAuth Flows =====
  @Get("google")
  @UseGuards(AuthGuard("google"))
  google() {
    // Passport handles redirect
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  googleCallback(@Req() req: any) {
    return this.authService.oauthLogin(req.user);
  }

  @Get("linkedin")
  @UseGuards(AuthGuard("linkedin"))
  linkedin() {
    // Passport handles redirect
  }

  @Get("linkedin/callback")
  @UseGuards(AuthGuard("linkedin"))
  linkedinCallback(@Req() req: any) {
    return this.authService.oauthLogin(req.user);
  }
}
