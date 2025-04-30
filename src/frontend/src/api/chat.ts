import { socket } from '../socket/socket'
import { sendMessage } from '../socket/chat'
import { Message } from '../types/message'

export function sendRoomMessage(
    roomId: string,
    message: string,
    localId: string,
    senderId: number
): Message {
    sendMessage(roomId, message, localId)

    return {
        roomId,
        message,
        senderId,
        localId,
        delivered: false,
        createdAt: new Date(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
}