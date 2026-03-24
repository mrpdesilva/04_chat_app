import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { setMessages, selectedConversation, setLastMessage, clearUnread } = useConversation()

    useEffect(() => {
        if (!selectedConversation?._id) return

        const otherId = selectedConversation._id

        // ✅ Clear in Zustand immediately (instant UI update)
        clearUnread(otherId)

        // ✅ Clear in MongoDB so it persists across browsers/sessions
        fetch(`/api/unread/clear/${otherId}`, { method: "POST" }).catch(() => {})

        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/messages/${otherId}`)
                const data = await res.json()

                if (data.error) throw new Error(data.error)

                setMessages(data)

                if (data.length > 0) {
                    const last = data[data.length - 1]
                    setLastMessage(otherId, {
                        message: last.message,
                        senderId: last.senderId?.toString(),
                    })
                }

            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        getMessages()

    }, [selectedConversation?._id]) // eslint-disable-line react-hooks/exhaustive-deps

    return { messages: useConversation((s) => s.messages), loading }
}

export default useGetMessages