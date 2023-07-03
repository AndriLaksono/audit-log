## Audit Log Library

The Audit Log library provides functionality to send log messages to a Pub/Sub topic for auditing purposes. It is designed to be used in Node.js applications.

### Installation

Install the Audit Log library using npm:

```bash
npm install audit-log-testing
```

### Usage

Import the `AuditLog` class and initialize it with the configuration options. Then, use the `log` method to send log messages.

```javascript
// Import the AuditLog class
const { AuditLog } = require('audit-log-testing');

// Initialize the AuditLog with configuration
const config = {
  keyFilename: './service-account-key.json',
  topic: 'audit-log',
  environment: 'development',
  service: 'smartweb-backend',
  platform: 'smartweb',
};

const logger = AuditLog.init(config);

// Create a log message
const logMessage = {
  merchantKey: 'HQ-01-01',
  action: 'create',
  resourceName: 'save-order-type',
  resourceId: '1234',
  previousValues: null,
  updatedValues: { orderTypeId: 1 },
  userId: '1',
  clientIp: '127.0.0.1',
  metadata: { orderTypeId: 1 },
};

// Send the log message
logger.log(logMessage);
```

### Configuration

The `AuditLog` class requires a configuration object with the following properties:

- `keyFilename` (string): The path to the service account key file. Example: `"./service-account-key.json"`.
- `topic` (string): The name of the Pub/Sub topic to publish log messages to. Example: `"audit-log"`.
- `environment` (string): The environment that the service is running in. Valid values: `"development"`, `"staging"`, `"uat"`, `"production"`.
- `service` (string): The name of the service that is publishing the logs. Example: `"my-service"`.
- `platform` (string): The platform that the service is running on. Example: `"smartweb"`.

### Log Message

The log message passed to the `log` method should be an object conforming to the `LogData` interface. It can include the following properties:

- `merchantKey` (string): The merchant key of the merchant that the log is for.
- `action` (string): The action that was performed. Example: `"create"`, `"update"`, `"delete"`.
- `resourceName` (string): The resource that was acted upon. Example: `"user"`, `"merchant"`, `"order"`.
- `resourceId` (string): The ID of the resource that was acted upon.
- `previousValues` (any, optional): The previous values of the resource that was acted upon.
- `updatedValues` (any, optional): The updated values of the resource that was acted upon.
- `userId` (string, optional): The ID of the user that performed the action.
- `clientIp` (string, optional): The IP address of the user that performed the action.
- `metadata` (any, optional): Additional metadata associated with the log.

### Example

Here's an example of how to use the Audit Log library:

```javascript
const { AuditLog } = require('audit-log-testing');

// Initialize the AuditLog with configuration
const config = {
  keyFilename: './service-account-key.json',
  topic: 'audit-log',
  environment: 'development',
  service: 'my-service',
  platform: 'platform-A',
};

const logger = AuditLog.init(config);

// Create a log message
const logMessage = {
  merchantKey: 'HQ-01-01',
  action: 'create',
  resourceName: 'save-order-type',
  resourceId: '1234',
  previousValues: null,
  updatedValues: { orderTypeId: 1 },
  userId: '1',
  clientIp: '127.0.0.1',
  metadata: { orderTypeId: 1 },
};

// Send the log message
logger.log(logMessage);
```

### Note

- Make sure to replace `'./service-account-key.json'` with the actual path to your service account key file.
- Adjust the configuration values (`topic`, `environment`, `service`, `platform`) and the log message properties according to your specific requirements.

That's it! You can now use the Audit Log library to send log messages to a Pub/Sub topic for auditing purposes in your Node.js applications.