import { F1TelemetryClient } from '@racehub-io/f1-telemetry-client'
import { packetRouter } from '@/infra/udp/packet-router'
import { env } from './env'

async function bootstrap() {
  const port = env.UDP_PORT
  const client = new F1TelemetryClient({ port })
  packetRouter(client)
}

bootstrap()
