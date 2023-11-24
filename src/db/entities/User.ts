import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'

import { ApiProperty } from '@nestjs/swagger'

@Entity('users')
@Unique('ux_users_email', ['email'])
export class User {
  @ApiProperty()
  @PrimaryColumn({
    type: 'bigint',
    primaryKeyConstraintName: 'pk_users_id',
  })
  public id: string

  @ApiProperty()
  @Column()
  public email: string

  @ApiProperty()
  @Column()
  public name: string

  @ApiProperty()
  @Column()
  public password: string

  @ApiProperty()
  @Column({ nullable: true })
  email_verified_at?: Date

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date
}
