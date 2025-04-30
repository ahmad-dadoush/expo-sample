import mysql from 'mysql2/promise'
import { config } from '../config/db'

export async function initDatabase() {
    const connection = await mysql.createConnection(config)

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `)

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS rooms (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `)

    console.log('[DB] Ensured users table exists')
    await connection.end()
}
