import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    // private userService: UserService,
    private authService: AuthService,
  ) {}
  @Post('signup')
  async signup(@Body() body: UserDto) {
    return await this.authService.signup(body);
  }
  @Post('login')
  async login(@Body() body: UserDto) {
    return await this.authService.login(body);
  }
}
