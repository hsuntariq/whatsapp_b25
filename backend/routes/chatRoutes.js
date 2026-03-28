import express from 'express'
import { sendMessage } from '../controllers/chatController.js'

export const chatRouter = express.Router()


chatRouter.post( '/send-message', sendMessage )