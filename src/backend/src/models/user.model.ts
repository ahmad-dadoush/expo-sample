import db from '../config/db';

export async function createUser(email: string, password: string) {
  const [result] = await db.execute(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, password]
  );
  return result;
}

export async function findUserByEmail(email: string) {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return (rows as any[])[0];
}