/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { request } from "http";
import type { LogInput, Status } from './types'

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
  message: string = "",
  { platform = "node", type = "info", container = "cdn-server" }: LogInput = {}
): Promise<Status> => {
  const data = JSON.stringify({
    message,
    platform,
    type,
    container
  });

  return new Promise((resolve, reject) => {
    const req = request(
      Object.assign({}, options, {
        hostname: process.env.LOGGER_URL || "logger"
      }),
      (res: any) => {
        const chunks: Buffer[] = [];

        res.on("data", chunk => {
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
  });
};

process.on("message", async ({ message, options }) => {
  try {
    await log(message, options);
  } catch (e) {
    console.error(e);
  }
});