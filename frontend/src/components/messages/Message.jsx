import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
import { extractTime } from '../../utils/extractTime'

const Message = ({ message }) => {
    const { authUser } = useAuthContext()
    const { selectedConversation } = useConversation()
    const fromMe = message.senderId === authUser._id
    const formattedTime = extractTime(message.createdAt)
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
    const shakeClass = message.shouldShake ? "shake" : ""

    return (
        <div className={`msg-row ${fromMe ? 'from-me' : ''} ${shakeClass}`}>
            <img src={profilePic} alt="avatar" className="msg-avatar" />
            <div className="msg-content">
                <div className={`msg-bubble ${fromMe ? 'outgoing' : 'incoming'}`}>
                    {message.message}
                </div>
                <span className="msg-time">{formattedTime}</span>
            </div>
        </div>
    )
}

export default Message