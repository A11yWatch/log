/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export type LogInput = {
  container?: string;
  type?: string;
  platform?: string;
  config?: {
    container?: string;
    disabled?: boolean;
  };
};

export type Status = {
  status: number;
  message?: string;
  error?: string;
};
