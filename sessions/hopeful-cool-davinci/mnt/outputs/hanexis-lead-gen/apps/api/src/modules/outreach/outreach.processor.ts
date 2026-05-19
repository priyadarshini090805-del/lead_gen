import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { QueueService, QueueName } from "../../common/queue/queue.service";
import { OutreachService } from "./outreach.service";

@Injectable()
export class OutreachProcessor implements OnModuleInit {
  private readonly logger = new Logger(OutreachProcessor.name);

  constructor(
    private readonly queue: QueueService,
    private readonly outreach: OutreachService,
  ) {}

  onModuleInit() {
    this.queue.registerWorker<{ messageId: string }>(QueueName.OUTREACH, async (job) => {
      this.logger.log(`Processing outreach job: ${job.name} for message ${job.data.messageId}`);
      // TODO: dispatch to LinkedIn / Instagram integration
      await this.outreach.markSent(job.data.messageId);
    });
  }
}
