import { mailConfig, redisConfig } from '@/app.config'
import { MailerModule } from '@nestjs-modules/mailer'
import { BullModule } from '@nestjs/bullmq'
import { Global, Module } from '@nestjs/common'
import { MailProcessor } from './mail.processor'
import { MailService } from './mail.service'

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      connection: redisConfig,
    }),
    BullModule.registerQueue({
      name: 'email',
    }),
    MailerModule.forRoot(mailConfig),
  ],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
