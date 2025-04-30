import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail } from '../models/user.model'
import { JWT_SECRET } from '../config/env'

export async function register(req: Request, res: Response) {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await createUser(email, hashedPassword);
        res.status(201).json({ message: 'User registered successfully' })
    } catch (err: any) {
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'Email already in use' })
        } else {
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

    const user = await findUserByEmail(email)
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token })
}