import mongoose from "mongoose"

const unreadSchema = new mongoose.Schema({
    // The user who HAS unread messages
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // The other user whose conversation has unread messages
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    count: {
        type: Number,
        default: 0,
    },
}, { timestamps: true })

// Compound index so lookups are fast
unreadSchema.index({ userId: 1, fromUserId: 1 }, { unique: true })

const Unread = mongoose.model("Unread", unreadSchema)

export default Unread