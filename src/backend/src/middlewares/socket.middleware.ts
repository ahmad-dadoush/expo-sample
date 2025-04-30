import { attachUserFromToken } from '../utils/attachUserFromToken'

export function socketAuthMiddleware(socket: any, next: (err?: any) => void): void
{
    try {
        attachUserFromToken(socket)
        next()
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Authentication error'
        next(new Error(message))
    }
}