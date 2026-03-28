import { Chat } from "../models/chatModel.js"

export const sendMessage = async ( req, res ) => {
    const { message } = req.body
    const { sender_id, receiver_id } = req.params


    // add message

    const newMessage = await Chat.create( {
        sender_id, receiver_id, chats: message
    } )


    res.send( newMessage )




}