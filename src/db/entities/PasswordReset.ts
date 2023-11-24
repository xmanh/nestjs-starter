import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core'

@Entity({ tableName: 'password_resets' })
export class PasswordReset {
  @PrimaryKey({ type: 'bigint' })
  id: number

  @Index()
  @Property()
  email: string

  @Property()
  token: string

  @Property()
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
