import { io, Socket } from 'socket.io-client';
import { EVENT } from '~/constants';
import { PROPERTIES } from '~/constants/properties';

class RoomSocket {
  socket: Socket | null;
  constructor() {
    this.socket = null;
  }

  private generateRoomSocket() {
    this.socket = io(`${PROPERTIES.ROOM_SOCKET_URI}`, {
      transports: ['websocket', 'polling'], // use WebSocket first, if available
    });
  }

  initRoomSocket(roomId: string) {
    if (roomSocket.socket === null) {
      roomSocket.generateRoomSocket();
    }
    roomSocket.socket?.connect();
    this.socket?.emit(EVENT.JOIN_ROOM, { roomId });
    console.log(`initRoomSocket`);
  }

  sendMessage(roomId: string, message: string) {
    roomSocket.socket?.emit(EVENT.CHAT_MESSAGE, {
      roomId,
      message,
    });
  }

  leaveRoom(roomId: string) {
    this.socket?.emit(EVENT.LEAVE_ROOM, { roomId });
    this.socket?.off(EVENT.JOIN_ROOM);
    this.socket?.off(EVENT.LEAVE_ROOM);
    this.socket?.off(EVENT.CHAT_MESSAGE);
    this.socket?.off(EVENT.EXISTING_ROOM_USERS);
    this.socket?.disconnect();
    console.log(`leaveRoom roomId`);
  }
}

const roomSocket = new RoomSocket();

export default roomSocket;
