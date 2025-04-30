import { View, Text } from 'react-native'
import { Message } from '../types/message'

export default function MessageBubble({ item, isMe }: { item: Message; isMe: boolean }) {
    return (
        <View
            style={{
                alignSelf: isMe ? 'flex-end' : 'flex-start',
                backgroundColor: isMe ? '#DCF8C6' : '#E2E2E2',
                borderRadius: 12,
                marginVertical: 4,
                paddingHorizontal: 10,
                paddingVertical: 8,
                maxWidth: '70%',
            }}
        >
            <Text>{item.message}</Text>
            <Text
                style={{
                    fontSize: 10,
                    color: 'gray',
                    textAlign: isMe ? 'right' : 'left',
                    marginTop: 2,
                }}
            >
                {item.timestamp} {isMe && item.delivered && '✔️'}
            </Text>
        </View>
    )
}