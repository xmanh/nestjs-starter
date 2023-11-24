import { genId } from '@/shared/utils'
import { Entity, EntityDTO, Index, PrimaryKey, Property } from '@mikro-orm/core'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'bigint' })
  @ApiProperty()
  id: string = genId()

  @Index()
  @Property()
  @ApiProperty()
  public email: string

  @Property()
  @ApiProperty()
  public name: string

  @Exclude()
  @Property({ hidden: true })
  @ApiHideProperty()
  public password: string

  @Property({ nullable: true })
  @ApiProperty()
  email_verified_at?: Date = null

  @Property()
  @ApiProperty()
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  @ApiProperty()
  updatedAt: Date = new Date()
}

export type UserDTO = EntityDTO<User>
