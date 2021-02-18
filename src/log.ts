/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { fork } from "child_process";
import type { LogInput } from './types'

const log = (message: string, options: LogInput): void => {
  if (!process.env.LOGGER_ENABLED) {
    const type = options?.type ?? 'log';
    return console[typeof console[type] === "function" ? type : "log"](message);
  }
  const child = fork(`${__dirname}/log-event`, [], { detached: true });
  child.send({message, options});
  child.unref();
};

export { log };
