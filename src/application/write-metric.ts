import { MetricRepository } from '@/application/repositories/metric-repository'

export class WriteMetricUseCase {
  constructor(private metricsRepository: MetricRepository) {}
  async execute({
    MetricData,
    MetricType,
  }: {
    MetricData: Record<string, number | string>
    MetricType: string
  }): Promise<void> {
    this.metricsRepository.write(MetricData, MetricType)
  }
}
