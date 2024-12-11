import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { MessageDto } from './dtos/message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}
  async createMessage(body: MessageDto) {
    const newMessage = this.messageRepository.create(body);
    await this.messageRepository.save(newMessage);
  }
  async getAllMessages() {
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .innerJoinAndSelect('message.userId', 'user')
      .select(['message.content', 'user.username'])
      .getMany();
    return messages;
  }
}
