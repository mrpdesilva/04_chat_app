import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { useSocketContext } from '../../context/SocketContext';

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation()

    useEffect(() => {
        return () => { setSelectedConversation(null) }
    }, [setSelectedConversation])

    return (
        <div className="msg-container">
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    <ChatHeader conversation={selectedConversation} />
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    )
}

const ChatHeader = ({ conversation }) => {
    const { onlineUsers } = useSocketContext()
    const { setSelectedConversation } = useConversation()   // ✅ fix: get it here
    const isOnline = onlineUsers.includes(conversation._id)

    return (
        <div className="chat-header">
            <div className="chat-header-avatar-wrap">
                <img src={conversation.profilePic} alt={conversation.fullName} className="chat-header-avatar" />
                {isOnline && <span className="chat-header-online-dot" />}
            </div>
            <div className="chat-header-info">
                <div className="chat-header-name">{conversation.fullName}</div>
                {isOnline
                    ? <div className="chat-header-status">● Online</div>
                    : <div className="chat-header-offline">Offline</div>
                }
            </div>

            <button
                className="chat-close-btn"
                onClick={() => setSelectedConversation(null)}  // ✅ now in scope
                title="Close chat"
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>
        </div>
    )
}

const NoChatSelected = () => {
    const { authUser } = useAuthContext()
    return (
        <div className="no-chat">
            <div className="no-chat-orb" />
            <div className="no-chat-icon-wrap">
                <TiMessages size={32} color="rgba(100,148,248,0.65)" />
            </div>
            <div>
                <p className="no-chat-title">
                    Hey, <span>{authUser.fullName?.split(' ')[0]}</span> 👋
                </p>
                <p className="no-chat-sub">Select a conversation to start messaging</p>
            </div>
        </div>
    )
}

export default MessageContainer