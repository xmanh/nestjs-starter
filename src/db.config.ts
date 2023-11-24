import 'dotenv/config'

import { DataSource } from 'typeorm'

import { PasswordReset, User } from '@/db/entities'
import {
  CreatePasswordResetsTable1700549563853,
  CreateUsersTable1700549446213,
} from '@/db/migrations'

const { NODE_ENV, DB_HOST, DB_USER, DB_PASS, DB_MAIN, DB_PORT, DB_TEST } =
  process.env

const isTest = NODE_ENV === 'test'
const isProd = NODE_ENV === 'production'

export const dbConfig: any = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASS,
  database: isTest ? DB_TEST : DB_MAIN,
  autoLoadEntities: true,
  logging: isProd ? false : true,
}

export default new DataSource({
  ...dbConfig,
  entities: [User, PasswordReset],
  migrations: [
    CreateUsersTable1700549446213,
    CreatePasswordResetsTable1700549563853,
  ],
})
