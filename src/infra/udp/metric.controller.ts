import { WriteMetricUseCase } from '@/application/write-metric'
import { InfluxDBMetricRepository } from '@/infra/repositories/influxdb-metric-repository'
import { flatten } from 'flat'

export function makeWriteMetricUseCase() {
  const metricsRepository = new InfluxDBMetricRepository()
  const writeMetricUseCase = new WriteMetricUseCase(metricsRepository)
  return writeMetricUseCase
}

export async function MetricController({
  data,
  packetName,
}: {
  data: unknown
  packetName: string
}) {
  const writeMetricUseCase = makeWriteMetricUseCase()
  await writeMetricUseCase.execute({
    MetricData: flatten(data),
    MetricType: packetName,
  })
}
