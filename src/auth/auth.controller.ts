import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AuthRequest, CreateUserDto } from './dtos/request.dto'
import { ApiTags } from '@nestjs/swagger'
import { ApiOkResponseDTO } from '@/shared/decorators'
import { User } from '@/db/entities'
import { ResponseDTO } from '@/shared/dto'
import { AuthService } from '@/auth/auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('local')
  @ApiOkResponseDTO({
    data: User,
  })
  async login(@Request() req: AuthRequest) {
    return new ResponseDTO({
      data: req.user,
    })
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body)
  }
}
