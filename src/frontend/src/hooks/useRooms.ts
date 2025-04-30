import { useEffect, useState } from 'react'
import { fetchRooms, createRoom as createRoomApi } from '../api/rooms'
import { Room } from '../types/room'
import { useNavigation } from '@react-navigation/native'

export function useRooms(token: string) {
    const [rooms, setRooms] = useState<Room[]>([])
    const [newRoomName, setNewRoomName] = useState('')
    const navigation = useNavigation<any>()

    useEffect(() => {
        loadRooms()
    }, [])

    const loadRooms = async () => {
        const data = await fetchRooms(token)
        setRooms(data)
    }

    const createRoom = async () => {
        if (!newRoomName.trim()) return
        await createRoomApi(token, newRoomName)
        setNewRoomName('')
        loadRooms()
    }

    const joinRoom = (roomId: number) => {
        navigation.navigate('Chat', { token, roomId: roomId.toString() })
    }

    return {
        rooms,
        newRoomName,
        setNewRoomName,
        createRoom,
        joinRoom
    }
}
