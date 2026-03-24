import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    // ✅ Grab the reset action from the store
    const resetStore = useConversation((state) => state.resetStore)

    const logout = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })

            const data = await res.json()

            if (data.error) throw new Error(data.error)

            localStorage.removeItem("chat-user")

            // ✅ Wipe all conversation state before switching user
            resetStore()

            setAuthUser(null)

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}

export default useLogout