import { View, Text, Button, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { useRooms } from '../hooks/useRooms'

export default function RoomListScreen({ route }: any) {
    const { token } = route.params
    const {
        rooms,
        newRoomName,
        setNewRoomName,
        createRoom,
        joinRoom,
    } = useRooms(token)

    return (
        <View style={{ flex: 1, padding: 16 }}>
        <TextInput
            style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
            placeholder="New Room Name"
            value={newRoomName}
            onChangeText={setNewRoomName}
        />
        <Button title="Create Room" onPress={createRoom} />

        <FlatList
            data={rooms}
            keyExtractor={(r) => r.id.toString()}
            renderItem={({ item }) => (
            <TouchableOpacity
                style={{ padding: 12, borderBottomWidth: 1 }}
                onPress={() => joinRoom(item.id)}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
            )}
        />
        </View>
    )
}