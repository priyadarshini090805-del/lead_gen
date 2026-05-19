import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class InstagramService {
  private readonly logger = new Logger(InstagramService.name);

  async sendDM(_accessToken: string, _userId: string, _body: string) {
    this.logger.log("Instagram DM (stub)");
    return { ok: true, providerId: `ig_${Date.now()}` };
  }

  async publishPost(_accessToken: string, _mediaUrl: string, _caption: string) {
    this.logger.log("Instagram publish (stub)");
    return { ok: true, providerId: `ig_post_${Date.now()}` };
  }
}
