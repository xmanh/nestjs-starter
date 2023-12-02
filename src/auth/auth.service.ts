import * as bcrypt from 'bcrypt'
import { PinoLogger } from 'nestjs-pino'
import { Repository } from 'typeorm'

import { User } from '@/db/entities'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from '@/auth/dtos'
import { genId } from '@/shared/utils'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private logger: PinoLogger,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    this.logger.setContext(AuthService.name)
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOneBy({ email: username })
    if (user && bcrypt.compareSync(password, user.password)) {
      user.password = undefined
      const accessToken = this.getAccessToken(user)
      return { ...user, accessToken }
    }
    return null
  }

  public async register(body: CreateUserDto) {
    const user = await this.userRepository.findOneBy({ email: body.email })

    if (user) {
      throw new HttpException(
        'User with that email already exists',
        HttpStatus.BAD_REQUEST,
      )
    }

    const newUser = this.userRepository.create({
      ...body,
      id: genId(),
      password: bcrypt.hashSync(body.password, 10),
    })

    await this.userRepository.save(newUser)
    newUser.password = undefined
    return newUser
  }

  getAccessToken(user: User) {
    return this.jwtService.sign({
      sub: user.id,
    })
  }
}
