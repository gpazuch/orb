/**
 * Sink Data Model Interface
 *
 * [Sinks Architecture]{@link https://github.com/ns1labs/orb/wiki/Architecture:-Sinks}
 */

import { OrbEntity } from './orb.entity.interface';
import { AWSConfig } from './sink/config/aws.config.interface';
import { PrometheusConfig } from './sink/config/prometheus.config.interface';

export enum SinkStates {
  active = 'active',
  error = 'error',
}

/**
 * @interface Sink
 */
export interface Sink extends OrbEntity {
  /**
   * Description {string}
   */
  description?: string;

  /**
   * A timestamp of creation {string}
   */
  ts_created?: string;

  /**
   * Tags {{[propName: string]: string}}
   */
  tags?: any;

  /**
   *  State: {string} = 'active'|'error'
   */
  state?: SinkStates;

  /**
   * Error Message: {string}
   * Contains error message if status is 'error' (read only)
   */
  error?: string;

  /**
   * Backend Type: {string}
   * Match a backend from /features/sinks.
   * Cannot change once created (read only)
   */
  backend?: string;

  /**
   * Sink Config {{[propName: string]: string}}
   * config: object containing sink specific info
   */
  config?: SinkTypes;
}

export type SinkTypes = PrometheusConfig | AWSConfig;

/**
 * Prometheus Sink Type
 * @type PromSink
 */
export type PromSink =
  | Sink
  | {
      config?: PrometheusConfig;
    };

/**
 * for future
 * Sink<T> = {..., config?: <T>, ...}
 * or
 * SpecificSink = Sink | {//{[overrides: string]: any};
 * or
 * SpecificSink extends PrometheusConfig;
 */
