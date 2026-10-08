import express from 'express'
import bcrypt from 'bcryptjs'
import { createToken } from '../utils/jwt.js'
import { findByUsername } from '../utils/db.js'

const router = express.Router()

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        return res.status(400).json({error: "Username and password cannot be empty"})
    }

    const user = findByUsername(username)
    if(!user){
        return res.status(401).json({error: "Invalid Credentials"})
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash)
    if(!passwordMatches){
        return res.status(401).json({error: "Invalid Credentials"})
    }

    const token = createToken(user)
    res.json({token})
})

export default router