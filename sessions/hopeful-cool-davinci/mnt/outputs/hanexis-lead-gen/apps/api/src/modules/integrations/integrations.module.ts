import { Module } from "@nestjs/common";
import { IntegrationsController } from "./integrations.controller";
import { IntegrationsService } from "./integrations.service";
import { LinkedInService } from "./linkedin.service";
import { InstagramService } from "./instagram.service";

@Module({
  controllers: [IntegrationsController],
  providers: [IntegrationsService, LinkedInService, InstagramService],
  exports: [IntegrationsService, LinkedInService, InstagramService],
})
export class IntegrationsModule {}
