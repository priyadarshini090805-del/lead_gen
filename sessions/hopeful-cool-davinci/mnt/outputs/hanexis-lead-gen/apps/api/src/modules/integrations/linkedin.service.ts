import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class LinkedInService {
  private readonly logger = new Logger(LinkedInService.name);

  async sendConnectionInvite(_accessToken: string, _profileUrn: string, _message: string) {
    // TODO: call LinkedIn API once approved. For now, log + simulate.
    this.logger.log("LinkedIn invite (stub)");
    return { ok: true, providerId: `li_${Date.now()}` };
  }

  async sendMessage(_accessToken: string, _conversationUrn: string, _body: string) {
    this.logger.log("LinkedIn message (stub)");
    return { ok: true, providerId: `li_msg_${Date.now()}` };
  }

  async getProfile(_accessToken: string) {
    return { id: "stub", firstName: "Stub", lastName: "User" };
  }
}
