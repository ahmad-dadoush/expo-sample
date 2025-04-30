import { socket } from '../socket'

export function sendMessage(roomId: string, message: string, localId: string) {
    socket.emit('send_room_message', { roomId, message, localId })
}
