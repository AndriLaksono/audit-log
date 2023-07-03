import { PubSub } from "@google-cloud/pubsub";
import { AuditLogConfig, LogData } from "./types";

class AuditLog {
  private static instance: AuditLog | null = null;
  private pubsub: PubSub;
  private topic: string;
  private environment: "development" | "staging" | "uat" | "production";
  private platform: string;
  private service: string;

  private constructor(config: AuditLogConfig) {
    this.pubsub = new PubSub({ keyFilename: config.keyFilename });
    this.topic = config.topic;
    this.environment = config.environment;
    this.platform = config.platform;
    this.service = config.service;
  }

  public static init(config: AuditLogConfig): AuditLog {
    if (!AuditLog.instance) {
      AuditLog.instance = new AuditLog(config);
    }

    return AuditLog.instance;
  }

  public async log(message: LogData): Promise<void> {
    if (!AuditLog.instance) {
      throw new Error('AuditLog has not been initialized. Call AuditLog.init() first.');
    }
    const data = {
      merchant_key: message.merchantKey,
      action: message.action,
      resource_name: message.resourceName,
      resource_id: message.resourceId,
      previous_values: message.previousValues,
      updated_values: message.updatedValues,
      user_id: message.userId,
      client_ip: message.clientIp,
      metadata: message.metadata,
      environment: AuditLog.instance.environment,
      platform: AuditLog.instance.platform,
      service: AuditLog.instance.service,
      timestamp: new Date().toISOString(),
    };

    console.log('Publishing message with data: ', data)

    try {
      await AuditLog.instance.pubsub.topic(AuditLog.instance.topic).publishMessage({ data: Buffer.from(JSON.stringify(data)) });
    } catch (error: any) {
      console.log('[warn] Failed publishing message to audit log: ', error)
    }
  }
}

export {
  AuditLog,
  LogData,
  AuditLogConfig,
}