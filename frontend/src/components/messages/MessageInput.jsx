import React, { useState } from 'react'
import { BsSend } from "react-icons/bs";
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
    const [message, setMessage] = useState("")
    const [focused, setFocused] = useState(false)
    const { sendMessage, loading } = useSendMessage()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!message) return
        await sendMessage(message)
        setMessage("")
    }

    return (
        <form className="msg-input-bar" onSubmit={handleSubmit}>
            <div className={`msg-input-inner ${focused ? 'focused' : ''}`}>
                <input
                    type="text"
                    className="msg-text-input"
                    placeholder="Type a message…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                <button
                    type="submit"
                    className="msg-send-btn"
                    disabled={loading || !message.trim()}
                >
                    {loading
                        ? <div className="msg-send-spinner" />
                        : <BsSend size={14} />
                    }
                </button>
            </div>
        </form>
    )
}

export default MessageInput