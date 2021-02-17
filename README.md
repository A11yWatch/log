# @a11ywatch/log

log reports to a11ywatch logger service

## Installation

`npm install @a11ywatch/log`

```typescript
const { log } = require("@a11ywatch/log");

log("saved something to db", {
  type: "info",
  container: "api",
  platform: "node"
});
```

## Configure logger endpoint

set the env variable `LOGGER_URL` to the logger service.

## Disable log stream

set the env variable `LOGGER_ENABLED` to false
