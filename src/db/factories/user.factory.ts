import { User } from '@/db/entities'
import { genId } from '@/shared/utils'
import { faker } from '@faker-js/faker'
import { Factory } from '@mikro-orm/seeder'
import * as bcrypt from 'bcrypt'

export class UserFactory extends Factory<User> {
  model = User

  definition(): Partial<User> {
    return {
      id: genId(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('WhUCyzE5', 10),
      name: faker.person.fullName(),
      email_verified_at: new Date(),
    }
  }
}
