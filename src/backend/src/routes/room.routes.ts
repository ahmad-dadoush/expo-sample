import { Router } from 'express'
import { createRoom, getRooms } from '../controllers/room.controller'
import { authenticateToken } from '../middlewares/auth.middleware'

const router = Router()

router.post('/', authenticateToken, createRoom)
router.get('/', authenticateToken, getRooms)

export default router
