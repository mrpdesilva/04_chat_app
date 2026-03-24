import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext'
import { useAuthContext } from '../../context/AuthContext'

const Conversation = ({ conversation, emoji }) => {
    const { selectedConversation, setSelectedConversation, lastMessages, unreadCounts } = useConversation()
    const { onlineUsers } = useSocketContext()
    const { authUser } = useAuthContext()

    const isSelected = selectedConversation?._id === conversation._id
    const isOnline = onlineUsers.includes(conversation._id)

    const lastMsg = lastMessages[conversation._id]
    const unreadCount = unreadCounts[conversation._id] || 0

    const getPreview = () => {
        if (!lastMsg?.message) return isOnline ? 'Online' : 'Offline'
        const isMe = lastMsg.senderId?.toString() === authUser._id?.toString()
        const prefix = isMe ? 'You: ' : ''
        const trimmed = lastMsg.message.length > 24
            ? lastMsg.message.slice(0, 24) + '…'
            : lastMsg.message
        return prefix + trimmed
    }

    const previewIsOnlineStatus = !lastMsg?.message

    return (
        <div
            className={`conv-item ${isSelected ? 'selected' : ''}`}
            onClick={() => setSelectedConversation(conversation)}
        >
            {/* Avatar */}
            <div className="conv-avatar-wrap">
                <img
                    src={conversation.profilePic}
                    alt={conversation.fullName}
                    className="conv-avatar"
                />
                {isOnline && <span className="conv-online-dot" />}
            </div>

            {/* Name + preview */}
            <div className="conv-info">
                <span className="conv-name">{conversation.fullName}</span>
                <span className={[
                    'conv-status',
                    previewIsOnlineStatus && isOnline ? 'conv-online-status' : '',
                    unreadCount > 0 ? 'conv-status-unread' : '',
                ].join(' ').trim()}>
                    {getPreview()}
                </span>
            </div>

            {/* Unread badge OR emoji */}
            <div className="conv-right">
                {unreadCount > 0
                    ? <span className="conv-unread-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
                    : <span className="conv-emoji">{emoji}</span>
                }
            </div>
        </div>
    )
}

export default Conversation