import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import MessageContainer from '../components/messages/MessageContainer'
import useListenMessages from '../hooks/useListenMessages'

const Home = () => {
    // ✅ Mounted here so the socket listener is ALWAYS active,
    // even when no conversation is open
    useListenMessages()

    return (
        <div className="home-root">
            {/* Ambient orbs */}
            <div className="home-orb home-orb-1" />
            <div className="home-orb home-orb-2" />
            <div className="home-orb home-orb-3" />

            {/* Floating particles */}
            <div className="home-particle hp1" />
            <div className="home-particle hp2" />
            <div className="home-particle hp3" />
            <div className="home-particle hp4" />
            <div className="home-particle hp5" />
            <div className="home-particle hp6" />

            {/* Floating chat card */}
            <div className="chat-card">
                <div className="chat-card-glow" />
                <div className="chat-card-inner-glow" />
                <Sidebar />
                <MessageContainer />
            </div>
        </div>
    )
}

export default Home