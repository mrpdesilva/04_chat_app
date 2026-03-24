import React, { useEffect, useRef } from 'react'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../../skeletons/MessageSkeleton'
import Message from './Message'

// ✅ useListenMessages removed from here — it lives in Home.jsx now

const Messages = () => {
    const { messages, loading } = useGetMessages()
    const lastMessageRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
    }, [messages])

    return (
        <div className="messages-scroll">
            {loading && (
                <div className="messages-skeletons">
                    {[...Array(6)].map((_, idx) => <MessageSkeleton key={idx} />)}
                </div>
            )}

            {!loading && messages.length === 0 && (
                <p className="messages-empty">No messages yet — say hello! 👋</p>
            )}

            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                    <Message message={message} />
                </div>
            ))}
        </div>
    )
}

export default Messages