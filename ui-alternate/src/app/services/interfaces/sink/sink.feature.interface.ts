/**
 * Base Sink Feature Interface
 *
 * [Sinks Architecture]{@link https://github.com/ns1labs/orb/wiki/Architecture:-Sinks}
 */

import { DynamicFormConfig } from "../dynamic.form.interface";

/**
 * @interface SinkFeature
 */
export interface SinkFeature {
  /**
   * Backend name {string}
   */
  backend?: string;

  /**
   * Backend description {string}
   */
  description?: string;

  /**
   * Backend config {DynamicFormConfig[]}
   */
  config?: DynamicFormConfig[];
}
