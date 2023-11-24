import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { ApiProperty } from '@nestjs/swagger'

@Entity('password_resets')
@Index('ix_password_resets_email', ['email'])
export class PasswordReset {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: 'bigint',
    primaryKeyConstraintName: 'pk_password_resets',
  })
  public id: number

  @ApiProperty()
  @Column()
  public email: string

  @ApiProperty()
  @Column()
  public token: string

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date
}
