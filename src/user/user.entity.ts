import { Message } from 'src/message/message.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(['username'])
  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Message, (message) => message.userId)
  messages: Message[];

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
