import { PubSub } from "@google-cloud/pubsub";

export class AuditLog {
  private client: PubSub;

  constructor(keyFileNameGoogle: string) {
    this.client = new PubSub({ keyFilename: keyFileNameGoogle });
  }

  public async log(topic: string, message: string) {
    console.log("Publishing message to audit-log topic")
    return await this.client.topic(topic).publishMessage({ data: Buffer.from(message) });
  }
}
