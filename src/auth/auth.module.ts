import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { AuthController } from './auth.controller'
import { PasswordReset, User } from '@/db/entities'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User, PasswordReset])],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
