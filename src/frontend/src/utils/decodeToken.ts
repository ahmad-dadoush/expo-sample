import { jwtDecode } from 'jwt-decode'

export function decodeToken<T = any>(token: string): T {
    return jwtDecode<T>(token)
}
