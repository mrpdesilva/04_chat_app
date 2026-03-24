import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import Unread from "../models/unread.model.js"
import { getReceiverSocketId, emitConversationUpdate, io } from "../socket/socket.js"

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({ senderId, receiverId, message })
        conversation.messages.push(newMessage._id)

        await Promise.all([conversation.save(), newMessage.save()])

        // Increment unread count for receiver in MongoDB
        await Unread.findOneAndUpdate(
            { userId: receiverId, fromUserId: senderId },
            { $inc: { count: 1 } },
            { upsert: true, new: true }
        )

        // Send full message to receiver's open chat
        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        // ✅ Pass createdAt so frontend can sort conversations by recency
        emitConversationUpdate(senderId, receiverId, message, newMessage.createdAt)

        res.status(200).json(newMessage)

    } catch (error) {
        console.log("Error in message controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages")

        if (!conversation) return res.status(200).json([])

        res.status(200).json(conversation.messages)

    } catch (error) {
        console.log("Error in getMessage controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}