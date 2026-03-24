import { create } from "zustand"

const initialState = {
    selectedConversation: null,
    messages: [],
    lastMessages: {},
    unreadCounts: {},
}

const useConversation = create((set) => ({
    ...initialState,

    // Wipe everything on logout
    resetStore: () => set(initialState),

    setSelectedConversation: (c) => set({ selectedConversation: c }),
    setMessages: (messages) => set({ messages }),

    // Last message preview per conversation
    setLastMessage: (otherId, msgObj) =>
        set((state) => ({
            lastMessages: { ...state.lastMessages, [otherId]: msgObj },
        })),
    setAllLastMessages: (map) => set({ lastMessages: map }),

    // Unread counts — sourced from backend, kept in memory
    setAllUnreadCounts: (map) => set({ unreadCounts: map }),

    incrementUnread: (otherId) =>
        set((state) => ({
            unreadCounts: {
                ...state.unreadCounts,
                [otherId]: (state.unreadCounts[otherId] || 0) + 1,
            },
        })),

    clearUnread: (otherId) =>
        set((state) => ({
            unreadCounts: { ...state.unreadCounts, [otherId]: 0 },
        })),
}))

export default useConversation