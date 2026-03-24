import User from "../models/user.model.js"
import Conversation from "../models/conversation.model.js"

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedUserId } }).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUsersForSideBar controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// GET /api/users/last-messages
// Returns { [otherUserId]: { message, senderId, createdAt } }
export const getLastMessages = async (req, res) => {
    try {
        const loggedUserId = req.user._id

        const conversations = await Conversation.find({
            participants: { $in: [loggedUserId] }
        }).populate({
            path: "messages",
            options: { sort: { createdAt: -1 }, limit: 1 }
        })

        const lastMessages = {}

        for (const conv of conversations) {
            if (!conv.messages || conv.messages.length === 0) continue

            const lastMsg = conv.messages[conv.messages.length - 1]
            const otherUserId = conv.participants.find(
                (p) => p.toString() !== loggedUserId.toString()
            )

            if (otherUserId) {
                lastMessages[otherUserId.toString()] = {
                    message: lastMsg.message,
                    senderId: lastMsg.senderId.toString(),
                    createdAt: lastMsg.createdAt,   // ✅ included for sorting
                }
            }
        }

        res.status(200).json(lastMessages)

    } catch (error) {
        console.log("Error in getLastMessages controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}