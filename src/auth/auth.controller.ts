import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AuthRequest } from './dtos/request.dto'

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: AuthRequest) {
    const user = req.user
    user.password = undefined
    return req.user
  }
}
