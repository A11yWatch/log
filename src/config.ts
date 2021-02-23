/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import type { LogInput } from "./types";

const config: LogInput["config"] = {
  container: "",
  disabled: false
};

const setConfig = (newConfig: LogInput["config"]): void => {
  if (newConfig) {
    if (newConfig?.container) {
      config.container = newConfig.container;
    }
    if ("disabled" in newConfig) {
      config.disabled = newConfig.disabled;
    }
  }
};

export { setConfig, config };
