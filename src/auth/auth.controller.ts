import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from 'generated/client';
import { SignUpDto } from './dto/signup';
import { SignInDto } from './dto/signin';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // POST SignUp User
  // POST Login User
  // POST Deactive User
  @Post('sign-up')
  async signUp(@Body() user: SignUpDto) {
    return await this.authService.signUp(user);
  }
  @Post('sign-in')
  async signIn(@Body() user: SignInDto) {
    return await this.authService.signIn(user);
  }
}
