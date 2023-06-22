"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLog = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
class AuditLog {
    constructor(keyFileNameGoogle) {
        this.client = new pubsub_1.PubSub({ keyFilename: keyFileNameGoogle });
    }
    log(message) {
        this.client.topic("audit-log").publishMessage({ data: message });
    }
}
exports.AuditLog = AuditLog;
