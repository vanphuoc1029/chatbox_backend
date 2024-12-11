import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(body: UserDto) {
    const { username, password } = body;
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = `${salt}.${hash.toString('hex')}`;
    return await this.userService.addUser(username, result);
  }

  async login(body: UserDto) {
    const { username, password } = body;
    const user = await this.userService.getUser(username);
    if (!user) {
      throw new NotFoundException();
    }
    const [salt, hash] = user.password.split('.');
    const hashToCheck = (await scrypt(password, salt, 32)) as Buffer;
    if (hashToCheck.toString('hex') === hash) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
