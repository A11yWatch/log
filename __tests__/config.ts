/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { config, setConfig } from "@app/config";

describe("Configs", () => {
  test("set app container configs", () => {
    const container = "jest";
    setConfig({ container });

    expect(config.container).toEqual(container);
  });
});
