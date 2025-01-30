import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const verifyToken = (token: string, secret: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(new Error("Unauthorized"))
            } else {
                resolve(decoded)
            }
        })
    })
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers["authorization"]?.split(" ")[1]
    if (!token) {
        res.status(401).json({ message: "Authorization token required" })
        return
    }

    try {
        const decoded = await verifyToken(token, process.env.JWT_SECRET || "3a1f9b8b092a2b9f7d4c5a86adfdca26")

        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            req.userId = (decoded as { id: string }).id
            return next()
        } else {
            res.status(401).json({ message: "Unauthorized" })
            return
        }
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }
}
