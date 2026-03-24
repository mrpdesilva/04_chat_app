import express from "express"
import { getUnreadCounts, clearUnreadCount } from "../controllers/unread.controller.js"
import protectRoute from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/", protectRoute, getUnreadCounts)
router.post("/clear/:fromUserId", protectRoute, clearUnreadCount)

export default router