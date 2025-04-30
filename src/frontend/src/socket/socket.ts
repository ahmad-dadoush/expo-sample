import { io } from 'socket.io-client'
import Constants from 'expo-constants'

export const socket = io(Constants.expoConfig?.extra?.socketUrl, {
    autoConnect: false
})