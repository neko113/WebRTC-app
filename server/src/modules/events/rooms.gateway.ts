import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { parseCookie } from '~/utils';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
  namespace: 'socket/rooms',
})
export class RoomsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private server: Server;
  private logger = new Logger('RoomGateway');

  constructor(private readonly) {}

  afterInit(server: Server) {
    this.server = server;
    this.logger.verbose('Initialized RoomGateway');
  }

  handleConnection(client: Socket) {
    const accessToken = parseCookie(client.handshake.headers.cookie, 'access_token');

    this.logger.verbose(`access_token: ${cookie}`);
  }

  handleDisconnect(client: Socket) {
    return;
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, room: string) {
    client.join(room);
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket, room: string) {
    client.leave(room);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string) {
    client.emit('message', message);
  }
}
