/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { log } from "@app/log";

describe("Log", () => {
  const configs = {
    type: "info",
    container: "api",
    platform: "node"
  };

  const LOGGER_URL = process.env.LOGGER_URL ?? "127.0.0.1";

  test("log output returns empty without logger url", () => {
    const q = "normal log no network";
    const output = log(q, configs);
    expect(output).toEqual(undefined);
  });

  test.skip("logs output to api with failure", async () => {
    process.env.LOGGER_ENABLED = "true";
    process.env.LOGGER_URL = undefined;

    expect.assertions(1);
    try {
      await log("error test");
    } catch (e) {
      expect(e).toEqual({
        error: "getaddrinfo ENOTFOUND undefined"
      });
    }
  });

  test.skip("logs output via network", async () => {
    process.env.LOGGER_ENABLED = "true";
    process.env.LOGGER_URL = LOGGER_URL;
    jest.setTimeout(30000);

    const output = await log("sent request to network success", {
      type: "info",
      container: "api",
      platform: "node"
    });
    expect(output).toEqual({
      status: 200
    });
  });
});
