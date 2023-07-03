export interface AuditLogConfig {
    /**
     * The path to the service account key file.
     *
     * Example:
     * - "./service-account-key.json"
     */
    keyFilename: string;
    /**
     * The name of the Pub/Sub topic to publish to.
     *
     * Example:
     * - "audit-log"
     */
    topic: string;
    /**
     * The environment that the service is running in.
     *
     * Examples:
     * - "development"
     * - "staging"
     * - "uat"
     * - "production"
     */
    environment: "development" | "staging" | "uat" | "production";
    /**
     * The name of the service that is publishing the logs.
     *
     * Examples:
     * - "order-service"
     * - "user-service"
     */
    service: string;
    /**
     * The platform that the service is running on.
     *
     */
    platform: string;
}
export interface LogData {
    /**
     * The merchant key of the merchant that the log is for.
     */
    merchantKey: string;
    /**
     * The action that was performed.
     *
     * Examples:
     * - "create"
     * - "update"
     * - "delete"
     */
    action: string;
    /**
     * The resource that was acted upon.
     *
     * Examples:
     * - "user"
     * - "merchant"
     * - "order"
     */
    resourceName: string;
    /**
     * The ID of the resource that was acted upon.
     *
     * Examples:
     * - "1234"
     * - "abcd"
     */
    resourceId: string;
    /**
     * The previous values of the resource that was acted upon.
     *
     * Examples:
     * - "{name:John Doe,age:30}"
     * - "1"
     */
    previousValues?: any;
    /**
     * The updated values of the resource that was acted upon.
     *
     * Examples:
     * - "{name:John Doe,age:30}"
     * - "1"
     */
    updatedValues?: any;
    /**
     * The ID of the user that performed the action.
     *
     * Examples:
     * - "1234"
     * - "abcd"
     */
    userId?: string;
    /**
     * The IP address of the user that performed the action.
     */
    clientIp?: string;
    /**
     * The metadata of the log.
     *
     * Examples:
     * - "{name:John Doe,age:30}"
     */
    metadata?: any;
}
