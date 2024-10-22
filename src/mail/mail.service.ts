import { ISendMailOptions } from '@nestjs-modules/mailer'
import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bullmq'

@Injectable()
export class MailService {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  async sendEmail(emailJob: ISendMailOptions) {
    await this.emailQueue.add('email', emailJob, {
      attempts: 3,
      backoff: 5000,
    })
  }
}
