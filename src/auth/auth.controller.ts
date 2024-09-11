import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'

import { JwtAuthGuard, LocalAuthGuard } from '@/auth/auth.guard'
import { AuthService } from '@/auth/auth.service'
import { ApiOkResponseDto } from '@/shared/decorators'
import { ResponseDto } from '@/shared/dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { PinoLogger } from 'nestjs-pino'
import { AuthLocalDto, AuthRequest, AuthUser, CreateUserDto } from './auth.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private logger: PinoLogger,
  ) {
    this.logger.setContext(AuthController.name)
  }

  @ApiOkResponseDto({
    data: AuthUser,
  })
  @UseGuards(LocalAuthGuard)
  @Post('local')
  async login(@Request() req: AuthRequest, @Body() _body: AuthLocalDto) {
    const data = await this.authService.getAuthUser(req.user)
    return new ResponseDto({ data })
  }

  @ApiOkResponseDto({
    data: AuthUser,
  })
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const user = await this.authService.register(body)
    const data = await this.authService.getAuthUser(user)
    return new ResponseDto({ data })
  }

  @ApiBearerAuth()
  @ApiOkResponseDto({
    data: AuthUser,
  })
  @UseGuards(JwtAuthGuard)
  @Get('refresh-token')
  async refreshToken(@Request() req: AuthRequest) {
    const accessToken = this.authService.getAccessToken(req.user.id)
    return new ResponseDto({ data: { accessToken } })
  }
}
