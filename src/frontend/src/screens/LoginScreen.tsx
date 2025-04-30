import { useState } from 'react'
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native'
import { login, register } from '../api/auth'
import { isValidEmail } from '../utils/validate'

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [mode, setMode] = useState<'login' | 'register'>('login')
    const [loading, setLoading] = useState(false)

    const handleAuth = async () => {
        setLoading(true)
        setError('')

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address.')
            return
        }

        try {
            let token = ''
            if (mode === 'login') {
                token = await login(email, password)
            } else {
                await register(email, password)
                token = await login(email, password)
            }

            navigation.navigate('Rooms', { token })
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={{ borderBottomWidth: 1, marginBottom: 12 }}
                editable={!loading}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderBottomWidth: 1, marginBottom: 12 }}
                editable={!loading}
            />

            {error !== '' && <Text style={{ color: 'red', marginBottom: 12 }}>{error}</Text>}

            {loading ? (
                <ActivityIndicator size="large" color="blue" style={{ marginVertical: 10 }} />
            ) : (
                <Button
                    title={mode === 'login' ? 'Login' : 'Register'}
                    onPress={handleAuth}
                />
            )}
            
            <Text
                onPress={() => !loading && setMode(mode === 'login' ? 'register' : 'login')}
                style={{ color: 'blue', marginTop: 20, textAlign: 'center' }}
            >
                {mode === 'login' ? "Don't have an account? Register" : "Already have an account? Login"}
            </Text>
        </View>
    )
}