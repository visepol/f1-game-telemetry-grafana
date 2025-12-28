import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  INFLUXDB_URL: z.string(),
  INFLUXDB_TOKEN: z.string(),
  INFLUXDB_ORG: z.string(),
  INFLUXDB_BUCKET: z.string(),
  INFLUXDB_BATCH_SIZE: z.coerce.number().default(20),
  INFLUXDB_FLUSH_INTERVAL: z.coerce.number().default(500),
  UDP_PORT: z.coerce.number().default(20777),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
