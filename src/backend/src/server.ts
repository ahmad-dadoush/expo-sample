import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import roomRoutes from './routes/room.routes'
import { roomSocketHandler } from './sockets/room.socket'
import { PORT } from './config/env'
import { socketAuthMiddleware } from './middlewares/socket.middleware'
import { initDatabase } from './db/init'

async function bootstrap() {
    await initDatabase();
    const app = express()
    app.use(cors())
    app.use(express.json())

    app.use('/api/auth', authRoutes)
    app.use('/api/rooms', roomRoutes)

    const server = http.createServer(app)
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    })

    io.use(socketAuthMiddleware)

    io.on('connection', (socket) => {
        roomSocketHandler(io, socket)
    })

    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

bootstrap()