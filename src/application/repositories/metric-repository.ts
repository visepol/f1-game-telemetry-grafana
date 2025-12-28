export interface MetricRepository {
  write(MetricData: Record<string, number | string>, MetricType: string): void
}
