# @a11ywatch/log

log reports to a11ywatch logger service

## Installation

`npm i @a11ywatch/log`

```typescript
const { log, setConfig } = require("@a11ywatch/log");

setConfig({ container: "api" });
// out -> { container } logged in each request

log("saved something to db", {
  type: "info",
  container: "api",
  platform: "chrome"
});
```

## Configure logger endpoint

set the env variable `LOGGER_URL` to the logger service.

## Disable log stream

set the env variable `LOGGER_ENABLED` to false. This will perform logs on the host console instead of logger service.

## Enable/disable verbose log outputs

set the env variable `LOGGER_VERBOSE` to true
