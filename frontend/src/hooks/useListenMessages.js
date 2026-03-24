import { useEffect, useRef } from "react"
import { useSocketContext } from "../context/SocketContext"
import { useAuthContext } from "../context/AuthContext"
import useConversation from "../zustand/useConversation"
import notificationSound from "../assets/sounds/notification.mp3"

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { authUser } = useAuthContext()

    const { messages, setMessages, selectedConversation, setLastMessage, incrementUnread } = useConversation()

    // Refs to avoid stale closures
    const messagesRef = useRef(messages)
    const selectedConvRef = useRef(selectedConversation)
    const authUserRef = useRef(authUser)

    useEffect(() => { messagesRef.current = messages }, [messages])
    useEffect(() => { selectedConvRef.current = selectedConversation }, [selectedConversation])
    useEffect(() => { authUserRef.current = authUser }, [authUser])

    const setMessagesRef = useRef(setMessages)
    const setLastMessageRef = useRef(setLastMessage)
    const incrementUnreadRef = useRef(incrementUnread)

    const sound = new Audio(notificationSound);

    useEffect(() => {
        if (!socket) return

        // Append message to open chat view
        const handleNewMessage = (newMessage) => {
            const senderId = newMessage.senderId?.toString()
            const currentChat = selectedConvRef.current?._id?.toString()
            if (currentChat === senderId) {
                newMessage.shouldShake = true
                sound.play();
                setMessagesRef.current([...messagesRef.current, newMessage])
            }
        }

        // Update sidebar preview + unread badge in real time
        const handleConversationUpdate = ({ fromUserId, lastMessage }) => {
            setLastMessageRef.current(fromUserId, lastMessage)

            const myId = authUserRef.current?._id?.toString()
            const currentChat = selectedConvRef.current?._id?.toString()
            const iAmReceiver = lastMessage.senderId !== myId

            if (iAmReceiver && currentChat !== fromUserId) {
                // ✅ Backend already saved +1 to MongoDB in message.controller
                // Just update the local Zustand count for instant UI response
                incrementUnreadRef.current(fromUserId)
                sound.play();
            }
        }

        socket.on("newMessage", handleNewMessage)
        socket.on("conversationUpdate", handleConversationUpdate)

        return () => {
            socket.off("newMessage", handleNewMessage)
            socket.off("conversationUpdate", handleConversationUpdate)
        }
    }, [socket])
}

export default useListenMessages