import { MetricRepository } from '@/application/repositories/metric-repository'
import { influxDB } from '@/infra/lib/influxdb'
import { Point } from '@influxdata/influxdb-client'
import { env } from '@/infra/env'

const writeApi = influxDB.getWriteApi(
  env.INFLUXDB_ORG,
  env.INFLUXDB_BUCKET,
  'ms',
  {
    batchSize: env.INFLUXDB_BATCH_SIZE,
    flushInterval: env.INFLUXDB_FLUSH_INTERVAL,
  },
)

function createPoint({ measurement, data }): Point {
  const point = new Point(measurement)

  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) continue

    switch (typeof value) {
      case 'string':
        point.tag(key, value)
        break

      case 'number':
        Number.isInteger(value)
          ? point.intField(key, value)
          : point.floatField(key, value)
        break

      case 'boolean':
        point.booleanField(key, value)
        break
    }
  }

  return point
}

export class InfluxDBMetricRepository implements MetricRepository {
  write(MetricData: Record<string, number | string>, MetricType: string): void {
    const point = createPoint({ measurement: MetricType, data: MetricData })
    writeApi.writePoint(point)
  }
}
