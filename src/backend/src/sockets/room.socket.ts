import { Server, Socket } from 'socket.io'

export interface CustomSocket extends Socket {
    userId: string
}

export function roomSocketHandler(io: Server, rawSocket: Socket) {
    const socket = rawSocket as CustomSocket
    console.log(`Socket ${socket.id} ready for rooms`)

    socket.on('join_room', (roomId: string) => {
        socket.join(roomId)
        console.log(`User ${socket.userId} joined room ${roomId}`)
    })

    socket.on('send_room_message', (data) => {
        const room = data.roomId.toString()
        const payload = {
            message: data.message,
            roomId: data.roomId,
            senderId: socket.userId,
            localId: data.localId
        }
        
        io.to(room).emit('receive_room_message', payload)
    })

    socket.on('leave_room', (roomId: string) => {
        socket.leave(roomId)
        console.log(`User ${socket.userId} left room ${roomId}`)
    })

    socket.on('typing', (data) => {
        socket.to(data.roomId).emit('user_typing', { roomId: data.roomId })
    })
    
    socket.on('stop_typing', (data) => {
        socket.to(data.roomId).emit('user_stop_typing', { roomId: data.roomId })
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${(socket as any).userId}`)
    })
}
