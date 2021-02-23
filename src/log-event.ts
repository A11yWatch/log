/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
const { request } = require("http");

const options = {
  method: "POST",
  hostname: process.env.LOGGER_URL,
  port: 8022,
  path: "/api/log/",
  headers: {
    "Content-Type": "application/json"
  },
  maxRedirects: 5
};

const log = (
  message = "",
  { platform = "node", type = "info", container = "" } = {},
  config
) => {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.stringify({
        message,
        platform,
        type,
        container: container || (config && config.container)
      });

      const req = request(
        Object.assign({}, options, {
          hostname: process.env.LOGGER_URL || "logger",
          port: process.env.NODE_ENV === "production" ? 0 : options.port
        }),
        res => {
          const chunks = [];

          res.on("data", chunk => {
            // @ts-ignore
            chunks.push(chunk);
          });

          res.on("end", chunk => {
            const body = Buffer.concat(chunks);
            const bodyParsed = JSON.parse(body.toString());
            process.env.LOGGER_VERBOSE && console.log(bodyParsed);
            resolve(bodyParsed);
          });

          res.on("error", error => {
            process.env.LOGGER_VERBOSE && console.error(error);
            reject({ status: 500, error });
          });
        }
      );

      req.write(data);
      req.end();
    } catch (e) {
      console.error(e);
      reject({ status: 503, error: e });
    }
  });
};

try {
  const [message, options, config] = JSON.parse(process.argv[2]);
  log(message, options || {}, config).then(data => data);
} catch (e) {
  console.error(e);
}
