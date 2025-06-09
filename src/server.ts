import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db'
import appRoutes from './routes/appRoutes'
import authRoutes from './routes/authRoutes'
import { corsConfig } from './config/cors'

dotenv.config()

connectDB()

const server = express()

server.use(cors(corsConfig))

server.use(express.json())

server.use('/api/app', appRoutes)
server.use('/api/auth', authRoutes)

export default server