import { api } from './client'
import { socket } from '../socket/socket'
import { decodeToken } from '../utils/decodeToken'

export async function login(email: string, password: string): Promise<string> {
    const res = await api.post('/auth/login', { email, password })
    const token = res.data.token

    const decoded = decodeToken(token)
    socket.auth = { token }
    socket.connect()

    socket.on('connect', () => {
        (socket as any).userId = decoded.userId
    })

    return token
}

export async function register(email: string, password: string) {
    const res = await api.post('/auth/register', { email, password })
    return res.data
}