/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
const { request } = require("http");
const { options } = require("./options");

const log = (
  message = "",
  { platform = "node", type = "info", container = "" } = {},
  config
) => {
  try {
    const req = request(
      Object.assign({}, options, {
        hostname: process.env.LOGGER_URL || "logger",
        port: process.env.NODE_ENV === "production" ? 0 : options.port
      })
    );

    const data = JSON.stringify({
      message,
      platform,
      type,
      container: container || (config && config.container)
    });

    process.env.LOGGER_VERBOSE && console.log(data);
    req.write(data);
    req.end();
  } catch (e) {
    console.error(e);
  }
};

try {
  const [message, options, config] = JSON.parse(process.argv[2]);
  log(message, options || {}, config);
} catch (e) {
  console.error(e);
}
