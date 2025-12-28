import { constants, F1TelemetryClient } from '@racehub-io/f1-telemetry-client'
import { MetricController } from '@/infra/udp/metric.controller'

export function packetRouter(client: F1TelemetryClient) {
  const { PACKETS } = constants

  const handledPackets = [
    ['event', PACKETS.event],
    ['motion', PACKETS.motion],
    ['carSetups', PACKETS.carSetups],
    ['lapData', PACKETS.lapData],
    ['session', PACKETS.session],
    ['participants', PACKETS.participants],
    ['carTelemetry', PACKETS.carTelemetry],
    ['carStatus', PACKETS.carStatus],
    ['finalClassification', PACKETS.finalClassification],
    ['lobbyInfo', PACKETS.lobbyInfo],
    ['carDamage', PACKETS.carDamage],
    ['sessionHistory', PACKETS.sessionHistory],
    ['tyreSets', PACKETS.tyreSets],
    ['motionEx', PACKETS.motionEx],
  ] as const

  for (const [packetName, packet] of handledPackets) {
    client.on(packet, (data) => {
      MetricController({ data, packetName })
    })
  }
}
