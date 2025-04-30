import { Request, Response } from 'express'
import * as RoomModel from '../models/room.model'

export async function createRoom(req: Request, res: Response) {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ error: 'Room name required' })
    }

    try {
        await RoomModel.createRoom(name)
        res.status(201).json({ message: 'Room created successfully' })
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

export async function getRooms(req: Request, res: Response) {
    try {
        const rooms = await RoomModel.getAllRooms()
        res.json(rooms)
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }
}
