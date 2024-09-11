import { FastifyRequest } from 'fastify'

import { User } from '@/db/entities'
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

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
  @MinLength(8)
  @IsNotEmpty()
  password: string
}

export class AuthLocalDto {
  @ApiProperty()
  @Type(() => String)
  @IsEmail()
  @IsNotEmpty()
  username: string

  @ApiProperty()
  @Type(() => String)
  @MinLength(8)
  @IsNotEmpty()
  password: string
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email'] as const),
) {}

export class AuthUser extends OmitType(User, ['password'] as const) {
  @ApiProperty()
  public accessToken: string
}
