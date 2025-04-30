import { api } from './client'
import { Room } from '../types/room'

export async function fetchRooms(token: string): Promise<Room[]> {
    const res = await api.get('/rooms', {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

export async function createRoom(token: string, name: string): Promise<void> {
    await api.post('/rooms', { name }, {
        headers: { Authorization: `Bearer ${token}` }
    })
}