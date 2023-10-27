import 'dotenv/config'

import { RequestMethod } from '@nestjs/common'

const { NODE_ENV } = process.env

const isTest = NODE_ENV === 'test'
const isProd = NODE_ENV === 'production'

export const loggerConfig = {
  pinoHttp: {
    level: isProd ? 'info' : 'debug',
    transport: isProd
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            ignore: 'pid,hostname',
          },
        },
    autoLogging: isTest ? false : true,
    quietReqLogger: true,
    customErrorObject: () => {},
  },
  exclude: [{ method: RequestMethod.ALL, path: '/healthz' }],
}
