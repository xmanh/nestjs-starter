import { jwtConfig } from '@/app.config'
import { PasswordReset, User } from '@/db/entities'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User, PasswordReset]),
    JwtModule.register(jwtConfig),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
