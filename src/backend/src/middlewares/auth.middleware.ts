import { Request, Response, NextFunction } from 'express'
import { attachUserFromToken } from '../utils/attachUserFromToken'

export function authenticateToken(req: Request, res: Response, next: NextFunction): void
{
    try {
        attachUserFromToken(req)
        next()
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unauthorized'
        res.status(401).json({ error: message })
    }
}