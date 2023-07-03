"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLog = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
class AuditLog {
    constructor(config) {
        this.pubsub = new pubsub_1.PubSub({ keyFilename: config.keyFilename });
        this.topic = config.topic;
        this.environment = config.environment;
        this.platform = config.platform;
        this.service = config.service;
    }
    static init(config) {
        if (!AuditLog.instance) {
            AuditLog.instance = new AuditLog(config);
        }
        return AuditLog.instance;
    }
    log(message) {
        return __awaiter(this, void 0, void 0, function* () {
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
            console.log('Publishing message with data: ', data);
            try {
                yield AuditLog.instance.pubsub.topic(AuditLog.instance.topic).publishMessage({ data: Buffer.from(JSON.stringify(data)) });
            }
            catch (error) {
                console.log('[warn] Failed publishing message to audit log: ', error);
            }
        });
    }
}
exports.AuditLog = AuditLog;
AuditLog.instance = null;
