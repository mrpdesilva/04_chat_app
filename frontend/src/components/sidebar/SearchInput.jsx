import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

const SearchInput = () => {
    const [search, setSearch] = useState("")
    const [focused, setFocused] = useState(false)
    const { setSelectedConversation } = useConversation()
    const { conversations } = useGetConversations()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!search) return
        if (search.length < 3) return toast.error("Search must be at least 3 characters")
        const conversation = conversations.find((c) =>
            c.fullName.toLowerCase().includes(search.toLowerCase())
        )
        if (conversation) {
            setSelectedConversation(conversation)
            setSearch("")
        } else toast.error("No such user found")
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div className={`search-wrap ${focused ? 'focused' : ''}`}>
                <span className="search-icon-left">
                    <IoSearchSharp size={14} />
                </span>
                <input
                    type="text"
                    placeholder="Search people…"
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            </div>
            <button type="submit" className="search-btn">
                <IoSearchSharp size={15} />
            </button>
        </form>
    )
}

export default SearchInput