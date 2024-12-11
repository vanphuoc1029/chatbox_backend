import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { UserDto } from 'src/user/dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() body: UserDto) {
    return this.authService.login(body);
  }

  @Post('signup')
  signup(@Body() body: UserDto) {
    return this.authService.signup(body);
  }
}
