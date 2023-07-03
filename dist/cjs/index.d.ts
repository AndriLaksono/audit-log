import { AuditLogConfig, LogData } from "./types";
declare class AuditLog {
    private static instance;
    private pubsub;
    private topic;
    private environment;
    private platform;
    private service;
    private constructor();
    static init(config: AuditLogConfig): AuditLog;
    log(message: LogData): Promise<void>;
}
export { AuditLog, LogData, AuditLogConfig, };
