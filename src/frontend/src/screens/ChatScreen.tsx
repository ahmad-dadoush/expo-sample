import { View, Text, TextInput, Button, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { Message } from '../types/message'
import MessageBubble from '../components/MessageBubble'
import { formatDate } from '../utils/time'
import { useChat } from '../hooks/useChat'

export default function ChatScreen({ route }: any) {
    const { roomId } = route.params
    const {
        message,
        messages,
        flatListRef,
        setMessage,
        handleSend,
        currentUserId,
    } = useChat(roomId)

    const renderItem = ({ item, index }: { item: Message, index: number }) => {
        const isMe = item.senderId === currentUserId
        const currentDate = item.createdAt ? new Date(item.createdAt) : new Date()
        const currentGroup = formatDate(currentDate)
    
        let showHeader = false
        if (index === 0) {
            showHeader = true
        } else {
            const prevItem = messages[index - 1]
            const prevDate = prevItem.createdAt ? new Date(prevItem.createdAt) : new Date()
            if (formatDate(currentDate) !== formatDate(prevDate)) {
                showHeader = true
            }
        }
    
        return (
            <View>
                {showHeader && (
                    <View style={{ alignItems: 'center', marginVertical: 10 }}>
                        <Text style={{ backgroundColor: '#ccc', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 }}>
                            {currentGroup}
                        </Text>
                    </View>
                )}
                <MessageBubble item={item} isMe={isMe} />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={80}
        >
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 20 }}
            />

            <View style={{ flexDirection: 'row', padding: 10, borderTopWidth: 1 }}>
                <TextInput
                    placeholder="Type a message"
                    value={message}
                    onChangeText={setMessage}
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 20,
                        paddingHorizontal: 15,
                        marginRight: 10
                    }}
                    onSubmitEditing={handleSend}
                    returnKeyType="send"
                />
                <Button title="Send" onPress={handleSend} />
            </View>
        </KeyboardAvoidingView>
    )
}