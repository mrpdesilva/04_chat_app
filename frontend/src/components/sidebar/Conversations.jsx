import React, { useMemo } from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import useConversation from '../../zustand/useConversation'
import { getRandomEmoji } from "../../utils/emojis"

// Generate emojis once per session so they don't re-randomise on every render
const emojiCache = {}
const getEmoji = (id) => {
    if (!emojiCache[id]) emojiCache[id] = getRandomEmoji()
    return emojiCache[id]
}

const Conversations = () => {
    const { loading, conversations } = useGetConversations()
    const { lastMessages, unreadCounts } = useConversation()

    const sorted = useMemo(() => {
        if (!conversations.length) return []

        return [...conversations].sort((a, b) => {
            const aUnread = unreadCounts[a._id] || 0
            const bUnread = unreadCounts[b._id] || 0
            const aMsg = lastMessages[a._id]
            const bMsg = lastMessages[b._id]

            // 1. Unread conversations always float to the top
            if (aUnread > 0 && bUnread === 0) return -1
            if (bUnread > 0 && aUnread === 0) return 1

            // 2. Among same unread status, sort by most recent message
            const aTime = aMsg?.createdAt ? new Date(aMsg.createdAt).getTime() : 0
            const bTime = bMsg?.createdAt ? new Date(bMsg.createdAt).getTime() : 0
            return bTime - aTime
        })
    }, [conversations, lastMessages, unreadCounts])

    return (
        <div className="conversations-root">
            {loading ? (
                <div className="conversations-spinner-wrap">
                    <div className="conversations-spinner" />
                </div>
            ) : sorted.length === 0 ? (
                <p className="conversations-empty">
                    No conversations yet.<br />Search for someone to start chatting.
                </p>
            ) : (
                sorted.map((conversation, idx) => (
                    <Conversation
                        key={conversation._id}
                        conversation={conversation}
                        emoji={getEmoji(conversation._id)}
                        lastIdx={idx === sorted.length - 1}
                    />
                ))
            )}
        </div>
    )
}

export default Conversations