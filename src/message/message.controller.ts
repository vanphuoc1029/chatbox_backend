import { Controller, Body, Post, Get } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './dtos/message.dto';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('create')
  async postMessage(@Body() body: MessageDto) {
    this.messageService.createMessage(body);
  }

  @Get('all')
  async getAllMessages() {
    return await this.messageService.getAllMessages();
  }
}
