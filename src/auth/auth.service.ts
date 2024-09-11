import * as bcrypt from 'bcrypt'
import { PinoLogger } from 'nestjs-pino'

import { User } from '@/db/entities'
import { genId } from '@/shared/utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager } from '@mikro-orm/postgresql'
import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '@/auth/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private logger: PinoLogger,
    @InjectRepository(User)
    private userRepo: EntityRepository<User>,
    private readonly em: EntityManager,
    private jwtService: JwtService,
  ) {
    this.logger.setContext(AuthService.name)
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepo.findOne({ email: username })
    if (user && bcrypt.compareSync(password, user.password)) {
      return wrap(user).toObject()
    }
    return null
  }

  async register(body: CreateUserDto) {
    const user = await this.userRepo.findOne({ email: body.email })

    if (user) {
      throw new BadRequestException('User with that email already exists')
    }

    const newUser = this.userRepo.create({
      ...body,
      id: genId(),
      password: bcrypt.hashSync(body.password, 10),
    })

    await this.em.persist(newUser).flush()
    return newUser
  }

  async getAuthUser(user: User) {
    const accessToken = this.getAccessToken(user.id)
    return { ...user, accessToken }
  }

  getAccessToken(userId: string) {
    return this.jwtService.sign({
      sub: userId,
    })
  }
}
