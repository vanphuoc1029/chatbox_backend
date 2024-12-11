import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;
  @Column()
  @ManyToOne(() => User, (user) => user.messages)
  userId: number;
  @Column()
  roomId: number;
  @Column()
  createdAt: Date;
  constructor(content: string, userId: number, roomId: number) {
    this.content = content;
    this.userId = userId;
    this.roomId = roomId;
    this.createdAt = new Date();
  }
}
