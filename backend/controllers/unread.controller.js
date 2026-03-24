import Unread from "../models/unread.model.js"

// GET /api/unread  — returns { [fromUserId]: count } for the logged-in user
export const getUnreadCounts = async (req, res) => {
    try {
        const userId = req.user._id

        const records = await Unread.find({ userId, count: { $gt: 0 } })

        const counts = {}
        records.forEach((r) => {
            counts[r.fromUserId.toString()] = r.count
        })

        res.status(200).json(counts)

    } catch (error) {
        console.log("Error in getUnreadCounts", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// POST /api/unread/clear/:fromUserId  — clears count when user opens a chat
export const clearUnreadCount = async (req, res) => {
    try {
        const userId = req.user._id
        const { fromUserId } = req.params

        await Unread.findOneAndUpdate(
            { userId, fromUserId },
            { count: 0 },
            { upsert: true }
        )

        res.status(200).json({ success: true })

    } catch (error) {
        console.log("Error in clearUnreadCount", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}