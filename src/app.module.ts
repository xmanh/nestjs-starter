import { LoggerModule } from 'nestjs-pino'

import { loggerConfig } from '@/app.config'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { TerminusModule } from '@nestjs/terminus'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { OrmModule } from '@/shared/orm.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot(loggerConfig),
    TerminusModule,
    AuthModule,
    OrmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
