import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import useConversation from "../zustand/useConversation"

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])
    const { setAllLastMessages, setAllUnreadCounts } = useConversation()

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {
                // Fetch users, last messages, and unread counts in parallel
                const [usersRes, lastMsgRes, unreadRes] = await Promise.all([
                    fetch("/api/users"),
                    fetch("/api/users/last-messages"),
                    fetch("/api/unread"),
                ])

                const usersData = await usersRes.json()
                const lastMsgData = await lastMsgRes.json()
                const unreadData = await unreadRes.json()

                if (usersData.error) throw new Error(usersData.error)
                if (lastMsgData.error) throw new Error(lastMsgData.error)
                if (unreadData.error) throw new Error(unreadData.error)

                setConversations(usersData)
                setAllLastMessages(lastMsgData)

                // ✅ Load unread counts from backend — accurate for ANY browser/user
                setAllUnreadCounts(unreadData)

            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        getConversations()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return { loading, conversations }
}

export default useGetConversations