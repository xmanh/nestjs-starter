import * as bcrypt from 'bcrypt'
import { DataSource } from 'typeorm'

import { User } from '@/db/entities'
import { faker } from '@faker-js/faker'
import { genId } from '@/shared/utils'

export const createUser = async (): Promise<Partial<User>> => ({
  id: genId(),
  email: faker.internet.email(),
  password: await bcrypt.hash('WhUCyzE5', 10),
  name: faker.person.fullName(),
  email_verified_at: new Date(),
})

export const seedUsers = async (db: DataSource) => {
  const users: Partial<User>[] = []
  for (let i = 0; i < 10; i++) users.push(await createUser())
  const repo = db.getRepository(User)
  await repo.clear()
  console.log(users)
  await repo.save(users)
  return await repo.find({})
}
