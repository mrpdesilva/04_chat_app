import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/messages.routes.js'
import userRoutes from './routes/users.routes.js'
import unreadRoutes from './routes/unread.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app, server } from './socket/socket.js'
import path from 'path'

dotenv.config()

const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true,
// }))

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)
app.use("/api/unread", unreadRoutes)   // ✅ new

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("{*path}", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

server.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server running on port ${PORT}`)
})