import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-linkedin-oauth2";

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, "linkedin") {
  constructor() {
    super({
      clientID: process.env.LINKEDIN_CLIENT_ID ?? "missing",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "missing",
      callbackURL: process.env.LINKEDIN_CALLBACK_URL ?? "http://localhost:4000/api/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"],
    });
  }

  async validate(_at: string, _rt: string, profile: any, done: (err: any, user?: any) => void) {
    const user = {
      email: profile.emails?.[0]?.value,
      fullName: profile.displayName,
      avatarUrl: profile.photos?.[0]?.value,
    };
    done(null, user);
  }
}
