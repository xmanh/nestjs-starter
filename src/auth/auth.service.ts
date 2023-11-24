import * as bcrypt from 'bcrypt'
import { PinoLogger } from 'nestjs-pino'
import { Repository } from 'typeorm'

import { User } from '@/db/entities'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
  constructor(
    private logger: PinoLogger,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.logger.setContext(AuthService.name)
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ email: username })
    if (user && bcrypt.compareSync(password, user.password)) {
      return user
    }
    return null
  }
}
