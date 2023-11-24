import { UserSeeder } from '@/db/seeders/UserSeeder'
import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'

export class DatabaseSeeder extends Seeder {
  run(em: EntityManager) {
    return this.call(em, [UserSeeder])
  }
}
