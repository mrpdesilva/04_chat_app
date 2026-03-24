import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {
    const { loading, logout } = useLogout()

    return loading ? (
        <div className="logout-spinner" />
    ) : (
        <button className="logout-btn" onClick={logout}>
            <div className="logout-icon-wrap">
                <BiLogOut size={14} color="rgba(240,100,100,0.8)" />
            </div>
            <span className="logout-label">Sign out</span>
        </button>
    )
}

export default LogoutButton