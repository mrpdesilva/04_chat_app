import { Server } from "socket.io"
import http from "http"
import express from "express"

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
})

const userSocketMap = {} // { userId: socketId }

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId.toString()]
}

// Fired after every message — updates sidebar for both sender and receiver
export const emitConversationUpdate = (senderId, receiverId, message, createdAt) => {
    const senderIdStr = senderId.toString()
    const receiverIdStr = receiverId.toString()

    const lastMessage = {
        message,
        senderId: senderIdStr,
        createdAt,  // ✅ timestamp so frontend can sort by recency
    }

    // Tell receiver: update the sender's conversation row
    const receiverSocketId = userSocketMap[receiverIdStr]
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("conversationUpdate", {
            fromUserId: senderIdStr,
            lastMessage,
        })
    }

    // Tell sender: update the receiver's conversation row
    const senderSocketId = userSocketMap[senderIdStr]
    if (senderSocketId) {
        io.to(senderSocketId).emit("conversationUpdate", {
            fromUserId: receiverIdStr,
            lastMessage,
        })
    }
}

io.on("connection", (socket) => {
    console.log("A user connected", socket.id)

    const userId = socket.handshake.query.userId
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export { io, app, server }