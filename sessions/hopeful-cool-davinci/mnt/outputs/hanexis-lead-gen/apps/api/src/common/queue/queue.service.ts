import { Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import { Queue, Worker, QueueEvents } from "bullmq";
import IORedis from "ioredis";

export enum QueueName {
  OUTREACH = "outreach",
  CONTENT = "content",
  NOTIFICATIONS = "notifications",
}

@Injectable()
export class QueueService implements OnModuleDestroy {
  private readonly logger = new Logger(QueueService.name);
  private readonly connection: IORedis;
  private readonly queues: Map<QueueName, Queue> = new Map();

  constructor() {
    this.connection = new IORedis({
      host: process.env.REDIS_HOST ?? "localhost",
      port: parseInt(process.env.REDIS_PORT ?? "6379", 10),
      password: process.env.REDIS_PASSWORD || undefined,
      maxRetriesPerRequest: null,
    });
  }

  getQueue(name: QueueName): Queue {
    if (!this.queues.has(name)) {
      this.queues.set(name, new Queue(name, { connection: this.connection }));
    }
    return this.queues.get(name)!;
  }

  async addJob<T>(name: QueueName, jobName: string, data: T, delayMs = 0) {
    const queue = this.getQueue(name);
    return queue.add(jobName, data, { delay: delayMs, attempts: 3, backoff: { type: "exponential", delay: 5000 } });
  }

  registerWorker<T>(name: QueueName, processor: (job: { data: T; name: string }) => Promise<void>): Worker {
    const worker = new Worker(name, async (job) => processor({ data: job.data as T, name: job.name }), {
      connection: this.connection,
    });
    worker.on("failed", (job, err) => this.logger.error(`Job ${job?.id} failed: ${err.message}`));
    return worker;
  }

  async onModuleDestroy() {
    await Promise.all([...this.queues.values()].map((q) => q.close()));
    await this.connection.quit();
  }
}
