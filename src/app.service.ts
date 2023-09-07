import { Injectable } from '@nestjs/common'
import { PinoLogger } from 'nestjs-pino'

@Injectable()
export class AppService {
  constructor(private logger: PinoLogger) {
    this.logger.setContext(AppService.name)
  }

  getHello() {
    return {
      status: 'OK',
    }
  }

  healthCheck() {
    return {
      status: 'UP',
    }
  }
}
