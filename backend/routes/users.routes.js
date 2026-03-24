import express from 'express'
import protectRoute from '../middleware/protectRoute.js'
import { getUsersForSideBar, getLastMessages } from "../controllers/users.controller.js"

const router = express.Router()

router.get("/", protectRoute, getUsersForSideBar)
router.get("/last-messages", protectRoute, getLastMessages)

export default router