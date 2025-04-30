import { useEffect, useState, useRef } from 'react'
import { FlatList } from 'react-native'
import { socket } from '../socket/socket'
import { onReceiveRoomMessage } from '../socket/chat'
import { Message } from '../types/message'
import { sendRoomMessage } from '../api/chat'
import { generateLocalId } from '../utils/uuid'

export function useChat(roomId: string) {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<Message[]>([])
    const flatListRef = useRef<FlatList>(null)

    useEffect(() => {
        socket.emit('join_room', roomId.toString())
    
        const handleIncomingMessage = (data: Message) => {
    
            if (parseInt(data.roomId) !== parseInt(roomId)) return
    
            if (data.senderId === (socket as any).userId) {
                setMessages(prev =>
                    prev.map(msg =>
                        msg.localId === data.localId ? { ...msg, delivered: true } : msg
                    )
                )
            } else {
                setMessages(prev => [
                    ...prev,
                    {
                        ...data,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        createdAt: new Date(),
                        delivered: true
                    }
                ])
            }
        }
    
        const recMsgOff = onReceiveRoomMessage(handleIncomingMessage)
    
        return () => {
            recMsgOff()
            socket.emit('leave_room', roomId.toString())
        }
    }, [roomId])
    

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
    }, [messages])

    const handleSend = () => {
        if (!message.trim()) return

        const localId = generateLocalId()
        const userId = (socket as any).userId
        const localMessage = sendRoomMessage(roomId, message, localId, userId)

        setMessages(prev => [...prev, localMessage])
        setMessage('')
    }

    return {
        message,
        messages,
        flatListRef,
        setMessage,
        handleSend,
        currentUserId: (socket as any).userId
    }
}
