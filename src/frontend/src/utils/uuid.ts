import { v4 as uuid } from 'uuid'

export function generateLocalId(): string {
    return uuid()
}