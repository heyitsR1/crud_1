
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards
} from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { SignInDto } from './dto/sign-in.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Body() signInDto: SignInDto,@Res({ passthrough: true }) response: Response)
   {
    const { access_token } = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    response.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 120000,
      path: '/',
    });

    return { message: 'Login successful', access_token };
  }
  @Get('logout')
  async logOut(@Res({ passthrough: true }) response: Response)
   {
    response.cookie('jwt', '', {
      httpOnly: true,
      maxAge: 1,
      path: '/',
    });
    return { message: 'Logged out successfully' };

  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
