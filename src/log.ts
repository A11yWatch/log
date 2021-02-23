/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { spawn } from "child_process";
import { config } from "./config";
import type { LogInput } from "./types";

const log = (message: string, options?: LogInput): void => {
  if (!process.env.LOGGER_ENABLED || config?.disabled) {
    const type = options?.type ?? "log";
    return typeof console[type] === "function" && console[type](message);
  }
  try {
    spawn("node", [
      `${__dirname}/log-event.${
        process.env.NODE_ENV === "production" ? "js" : "ts"
      }`,
      JSON.stringify([message, options, config])
    ]).unref();
  } catch (e) {
    console.error(e);
  }
};

export { log };
