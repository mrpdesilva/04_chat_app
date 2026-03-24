import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'

const Sidebar = () => {
    return (
        <div className="sidebar-root">
            <div className="sidebar-top">
                <div className="sidebar-brand">
                    <div className="sidebar-brand-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <span className="sidebar-brand-name">ChatApp</span>
                </div>
                <SearchInput />
            </div>

            <div className="sidebar-mid">
                <p className="sidebar-section-label">Messages</p>
                <Conversations />
            </div>

            <div className="sidebar-bottom">
                <LogoutButton />
            </div>
        </div>
    )
}

export default Sidebar