import 'dotenv/config'

export default {
  expo: {
    name: "chat-app",
    slug: "chat-app",
    scheme: "chat-app",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
      socketUrl: process.env.EXPO_PUBLIC_SOCKET_URL,
    }
  }
}