import {
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  afterInit(server: Socket) {
    console.log('Server initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connected: ', client.id);
  }

  handleDisconnect(client: any) {
    // console.log('Client disconnected: ', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('message', payload);
  }
}
