import { FastifyRequest } from 'fastify'

import { User } from '@/db/entities'
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty, Min } from 'class-validator'

export interface AuthRequest extends FastifyRequest {
  user: User
}

export class CreateUserDto {
  @ApiProperty()
  @Type(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @Type(() => String)
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @Type(() => String)
  @Min(8)
  @IsNotEmpty()
  password: string
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email'] as const),
) {}
