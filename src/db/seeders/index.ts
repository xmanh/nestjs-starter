import 'reflect-metadata'

import db from '@/db.config'

import { seedUsers } from './user.seeder'

const dbSeeding = async () => {
  await db.initialize()
  const users = await seedUsers(db)
  console.log(users)
  process.exit()
}

dbSeeding().catch((err) => console.log(err))
