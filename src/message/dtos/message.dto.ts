import { IsNumber, IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  content: string;
  @IsNumber()
  roomId: number;
  @IsNumber()
  userId: number;
}
