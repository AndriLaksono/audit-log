export declare class AuditLog {
    private client;
    constructor(keyFileNameGoogle: string);
    log(topic: string, message: string): Promise<string>;
}
