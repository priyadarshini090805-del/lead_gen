import { Module } from "@nestjs/common";
import { AiController } from "./ai.controller";
import { AiService } from "./ai.service";
import { PromptLibrary } from "./prompt-library";

@Module({
  controllers: [AiController],
  providers: [AiService, PromptLibrary],
  exports: [AiService],
})
export class AiModule {}
