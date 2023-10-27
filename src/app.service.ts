import { Injectable } from '@nestjs/common'
import { PinoLogger } from 'nestjs-pino'
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus'

@Injectable()
export class AppService {
  constructor(
    private logger: PinoLogger,
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {
    this.logger.setContext(AppService.name)
  }

  getHello() {
    return {
      status: 'OK',
    }
  }

  healthCheck() {
    return this.health.check([() => this.db.pingCheck('database')])
  }
}
