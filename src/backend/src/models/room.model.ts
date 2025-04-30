import db from '../config/db';

export async function createRoom(name: string) {
    const [result] = await db.execute(
        'INSERT INTO rooms (name) VALUES (?)',
        [name]
    );
    return result
}

export async function getAllRooms() {
    const [rows] = await db.execute('SELECT * FROM rooms');
    return rows as any[]
}
