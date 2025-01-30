import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import taskRoutes from './routes/taskRoutes'
import "./types/express"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

const PORT = process.env.PORT || 5000

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

mongoose.connect(mongoUri)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch(err => console.error(err))