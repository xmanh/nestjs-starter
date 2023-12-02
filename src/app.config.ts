import 'dotenv/config'

import { RequestMethod } from '@nestjs/common'
import { JwtModuleOptions } from '@nestjs/jwt'

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

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: process.env.JWT_TTL,
  },
}
