import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async addUser(username: string, password: string) {
    const user = new User(username, password);
    return await this.repo.save(user);
  }
  async getUser(username: string) {
    return await this.repo.findOne({ where: { username } });
  }
}
