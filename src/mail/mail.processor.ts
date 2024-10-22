import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'

@Processor('email')
export class MailProcessor extends WorkerHost {
  constructor(private mailerService: MailerService) {
    super()
  }

  async process(job: Job<any, any, string>) {
    const data = job.data as ISendMailOptions
    try {
      await this.mailerService.sendMail(data)
    } catch (error) {
      console.log(error)
    }
  }
}
