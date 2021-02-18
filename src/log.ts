/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { fork } from "child_process";
import type { LogInput } from './types'

const log = (message: string, options: LogInput): void => {
  const child = fork(`${__dirname}/log-event.js`, [], { detached: true });
  child.send({message, options});
  child.unref();
};

export { log };
