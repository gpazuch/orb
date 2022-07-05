/**
 * Agent Policy / Tap Config Interface
 *
 * [Policies Architecture]{@link https://github.com/ns1labs/orb/wiki/Architecture:-Policies-and-Datasets}
 * [Agent Taps](https://github.com/ns1labs/pktvisor/blob/develop/RFCs/2021-04-16-75-taps.md)
 */

import { PolicyHandler } from "../policy.handler.interface";
import { PolicyTap } from "../policy.tap.interface";

/**
 * @interface PolicyConfig
 */
export interface PolicyConfig {
  /**
   * info reserved
   */
  kind?: string;

  /**
   * version {string}
   */
  version?: string;

  /**
   * input type
   */
  input?: PolicyTap;

  /**
   * handlers object with configs
   */
  handlers?: {
    modules?: {
      [propName: string]: PolicyHandler | string | any,
    },
  };
}

