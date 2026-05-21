import { Injectable } from "@nestjs/common";

export enum QueueName {
  OUTREACH = "outreach",
  CONTENT = "content",
}

type QueueJob<T> = {
  name: string;
  data: T;
};

@Injectable()
export class QueueService {

  async addJob(
    queue: QueueName,
    name: string,
    data: any,
    delay?: number,
  ) {

    console.log(
      "[QUEUE DISABLED]",
      queue,
      name,
      data,
      delay,
    );

    return true;
  }

  registerWorker<T>(
    queue: QueueName,
    handler: (
      job: QueueJob<T>,
    ) => Promise<void>,
  ) {

    console.log(
      "[WORKER DISABLED]",
      queue,
    );

    return true;
  }
}