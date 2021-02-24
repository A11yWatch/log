/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const options = {
  method: "POST",
  hostname: process.env.LOGGER_URL,
  port: 8022,
  path: "/api/log/",
  headers: {
    "Content-Type": "application/json"
  },
  maxRedirects: 5
};
