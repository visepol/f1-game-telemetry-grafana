import { env } from '@/infra/env'
import { InfluxDB } from '@influxdata/influxdb-client'

export const influxDB = new InfluxDB({
  url: env.INFLUXDB_URL,
  token: env.INFLUXDB_TOKEN,
})
