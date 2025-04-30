export interface Message {
    roomId: string
    message: string
    senderId: number
    localId?: string
    delivered?: boolean
    createdAt?: Date
    timestamp?: string
}