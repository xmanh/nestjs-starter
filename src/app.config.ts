import { RequestMethod } from '@nestjs/common'

const { NODE_ENV = 'development' } = process.env
const isTest = NODE_ENV === 'test'
const isProd = NODE_ENV === 'production'
const isDev = NODE_ENV === 'development'

export const loggerConfig = {
  pinoHttp: {
    level: isProd ? 'info' : 'debug',
    transport: isProd
      ? undefined
      : {
          target: 'pino-pretty',

          options: {
            singleLine: true,
          },
        },
    autoLogging: isTest ? false : true,
    quietReqLogger: true,
  },
  exclude: [{ method: RequestMethod.ALL, path: '/healthz' }],
}
