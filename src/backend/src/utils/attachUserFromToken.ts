import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env'

/**
 * Supports both Express `req` and Socket.IO `socket`.
 * Extracts token from headers or handshake.auth, verifies it, and attaches userId.
 * Throws if token is missing or invalid.
 */
type TokenCarrier = {
    handshake?: {
        auth?: {
            token?: string
        }
    }
    headers?: {
        authorization?: string
    }
    userId?: number
    [key: string]: any
}

export function attachUserFromToken(target: TokenCarrier): void {
    const token =
        target.handshake?.auth?.token ??
        target.headers?.authorization?.replace(/^Bearer\s+/i, '')

    if (!token) {
        throw new Error('Authentication error: Token required')
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as { userId: number }
        target.userId = payload.userId
    } catch {
        throw new Error('Authentication error: Invalid token')
    }
}