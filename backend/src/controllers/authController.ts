import { Request, Response } from "express"
import User from "../models/user"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

export const register = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body
    try {
        const existingUser = await User.find({ username })
        if (existingUser) return res.status(400).json({ message: "User already exists" })

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, password: hashedPassword })
        await newUser.save()
        return res.status(201).json({ message: "User registered successfully" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })
        if (!user) return res.status(404).json({ message: "User not found!" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "3a1f9b8b092a2b9f7d4c5a86adfdca26", { expiresIn: "1h" })
        return res.status(200).json({ token })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}