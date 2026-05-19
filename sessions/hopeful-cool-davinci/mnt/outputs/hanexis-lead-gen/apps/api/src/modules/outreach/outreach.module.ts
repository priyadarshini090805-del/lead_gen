import { Module } from "@nestjs/common";
import { OutreachController } from "./outreach.controller";
import { OutreachService } from "./outreach.service";
import { OutreachProcessor } from "./outreach.processor";

@Module({
  controllers: [OutreachController],
  providers: [OutreachService, OutreachProcessor],
  exports: [OutreachService],
})
export class OutreachModule {}
