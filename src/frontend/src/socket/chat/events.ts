import { socket } from '../socket'
import { Message } from '../../types/message'

export function onReceiveRoomMessage(callback: (message: Message) => void) {
    socket.on('receive_room_message', callback)
    return () => socket.off('receive_room_message', callback)
}