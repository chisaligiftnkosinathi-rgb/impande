import { logger } from './logger';

export interface MetricTags {
  collectionId?: string;
  operation?: string;
  status?: 'success' | 'error';
  [key: string]: string | undefined;
}

export class Metrics {
  /**
   * Records a latency metric in milliseconds.
   */
  static histogram(name: string, valueMs: number, tags?: MetricTags) {
    // In production, this would send to Prometheus/Datadog.
    // For now, we emit a structured log that can be scraped.
    logger.info(`Metric: ${name}`, {
      metricType: 'histogram',
      metricName: name,
      value: valueMs,
      unit: 'ms',
      ...tags
    });
  }

  /**
   * Increments a counter metric.
   */
  static increment(name: string, value: number = 1, tags?: MetricTags) {
    logger.info(`Metric: ${name}`, {
      metricType: 'counter',
      metricName: name,
      value,
      ...tags
    });
  }
}
