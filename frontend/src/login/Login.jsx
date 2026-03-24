import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [focusedField, setFocusedField] = useState(null)

    const { loading, login } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(username, password)
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                html, body, #root {
                    height: 100%;
                    overflow: hidden;
                }

                .login-root {
                    height: 100vh;
                    width: 100vw;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'DM Sans', sans-serif;
                    position: relative;
                    overflow: hidden;
                    background-color: #05070f;
                    background-image:
                        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"),
                        radial-gradient(ellipse 70% 55% at 5% 0%, rgba(41,98,210,0.22) 0%, transparent 65%),
                        radial-gradient(ellipse 55% 60% at 105% 30%, rgba(109,40,217,0.18) 0%, transparent 60%),
                        radial-gradient(ellipse 50% 40% at 50% 105%, rgba(20,130,130,0.12) 0%, transparent 65%),
                        radial-gradient(ellipse 80% 70% at 50% 50%, rgba(15,25,60,0.9) 0%, transparent 80%);
                }

                .login-root::before {
                    content: '';
                    position: fixed; inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
                    background-size: 72px 72px;
                    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%);
                    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%);
                    pointer-events: none; z-index: 0;
                }
                .login-root::after {
                    content: '';
                    position: fixed; top: -40%; left: -20%;
                    width: 160%; height: 2px;
                    background: linear-gradient(90deg,
                        transparent 0%, rgba(88,130,242,0.0) 20%,
                        rgba(88,130,242,0.18) 45%, rgba(167,139,250,0.22) 55%,
                        rgba(88,130,242,0.0) 80%, transparent 100%);
                    transform: rotate(-28deg) translateY(60vh);
                    animation: streakDrift 9s ease-in-out infinite alternate;
                    pointer-events: none; z-index: 0;
                }
                @keyframes streakDrift {
                    from { transform: rotate(-28deg) translateY(40vh); opacity: 0.6; }
                    to   { transform: rotate(-28deg) translateY(80vh); opacity: 1; }
                }

                .orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; }
                .orb-1 { width:380px;height:380px;top:-100px;left:-80px;background:radial-gradient(circle,rgba(37,99,235,0.13) 0%,transparent 70%);animation:orbFloat1 18s ease-in-out infinite; }
                .orb-2 { width:320px;height:320px;bottom:-80px;right:-60px;background:radial-gradient(circle,rgba(109,40,217,0.12) 0%,transparent 70%);animation:orbFloat2 22s ease-in-out infinite; }
                .orb-3 { width:200px;height:200px;top:40%;left:60%;background:radial-gradient(circle,rgba(16,185,129,0.07) 0%,transparent 70%);animation:orbFloat3 15s ease-in-out infinite; }
                @keyframes orbFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
                @keyframes orbFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,-40px)} }
                @keyframes orbFloat3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,20px) scale(1.15)} }

                .particle { position:fixed;border-radius:50%;pointer-events:none;z-index:0;animation:particleFloat linear infinite; }
                .p1{width:2px;height:2px;background:rgba(130,170,255,0.55);top:18%;left:12%;animation-duration:10s}
                .p2{width:3px;height:3px;background:rgba(167,139,250,0.4);top:65%;left:82%;animation-duration:14s;animation-delay:3s}
                .p3{width:2px;height:2px;background:rgba(96,165,250,0.5);top:82%;left:28%;animation-duration:11s;animation-delay:6s}
                .p4{width:2px;height:2px;background:rgba(139,167,250,0.4);top:32%;left:74%;animation-duration:16s;animation-delay:1s}
                .p5{width:3px;height:3px;background:rgba(100,200,200,0.3);top:50%;left:5%;animation-duration:13s;animation-delay:4s}
                @keyframes particleFloat {
                    0%,100%{transform:translateY(0) translateX(0);opacity:0.6}
                    25%{transform:translateY(-14px) translateX(7px);opacity:1}
                    75%{transform:translateY(10px) translateX(-5px);opacity:0.4}
                }

                /* ── CARD ── */
                .login-card {
                    width: 100%; max-width: 400px;
                    padding: 36px 38px 30px;
                    border-radius: 22px;
                    position: relative; z-index: 1;
                    background: rgba(10,14,26,0.82);
                    border: 1px solid rgba(255,255,255,0.07);
                    box-shadow:
                        0 0 0 1px rgba(88,130,242,0.07),
                        0 40px 90px rgba(0,0,0,0.7),
                        0 12px 32px rgba(0,0,0,0.4),
                        inset 0 1px 0 rgba(255,255,255,0.07),
                        inset 0 -1px 0 rgba(0,0,0,0.3);
                    backdrop-filter: blur(28px);
                    -webkit-backdrop-filter: blur(28px);
                    animation: cardReveal 0.75s cubic-bezier(0.16,1,0.3,1) both;
                }
                @keyframes cardReveal {
                    from{opacity:0;transform:translateY(28px) scale(0.96)}
                    to{opacity:1;transform:translateY(0) scale(1)}
                }
                .card-glow-line {
                    position:absolute; top:-1px; left:12%; right:12%; height:1px;
                    background:linear-gradient(90deg,transparent,rgba(88,130,242,0.6) 30%,rgba(167,139,250,0.7) 60%,transparent);
                }
                .card-inner-glow {
                    position:absolute; top:0; left:0; right:0; height:50%;
                    border-radius:22px 22px 0 0;
                    background:linear-gradient(180deg,rgba(88,130,242,0.04) 0%,transparent 100%);
                    pointer-events:none;
                }

                /* ── HEADER — horizontal to save vertical space ── */
                .login-header {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 28px;
                    animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both;
                }
                @keyframes fadeUp {
                    from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)}
                }
                .brand-icon {
                    width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
                    background: linear-gradient(135deg,#2f58e0 0%,#6429cc 100%);
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 6px 20px rgba(47,88,224,0.4);
                    position: relative;
                }
                .brand-icon::after {
                    content:''; position:absolute; inset:-1px; border-radius:13px;
                    background:linear-gradient(135deg,rgba(255,255,255,0.18),transparent 60%);
                    pointer-events:none;
                }
                .brand-icon svg { width:20px; height:20px; }
                .header-text { display:flex; flex-direction:column; gap:3px; }
                .login-title {
                    font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:600;
                    letter-spacing:0.01em; color:#e4eaf8; line-height:1.15;
                }
                .login-title span {
                    background:linear-gradient(135deg,#6494f8 10%,#b48cf7 90%);
                    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
                }
                .login-subtitle {
                    font-size:12px; font-weight:300;
                    color:rgba(170,185,225,0.4); letter-spacing:0.02em;
                }

                /* ── FIELDS ── */
                .field-group { margin-bottom:16px; animation:fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }
                .field-group:nth-child(1){animation-delay:0.18s}
                .field-group:nth-child(2){animation-delay:0.24s}

                .field-label {
                    display:block; font-size:10px; font-weight:500;
                    text-transform:uppercase; letter-spacing:0.12em;
                    color:rgba(150,170,215,0.5); margin-bottom:6px;
                }
                .field-wrap { position:relative; }
                .field-icon {
                    position:absolute; left:13px; top:50%; transform:translateY(-50%);
                    color:rgba(130,150,200,0.4); transition:color 0.25s;
                    pointer-events:none; display:flex;
                }
                .field-wrap.focused .field-icon { color:#6494f8; }
                .field-input {
                    width:100%; padding:11px 14px 11px 40px;
                    border-radius:11px; border:1px solid rgba(255,255,255,0.065);
                    background:rgba(255,255,255,0.035); color:#d8e0f4;
                    font-size:14px; font-family:'DM Sans',sans-serif; font-weight:400;
                    outline:none; transition:border-color 0.25s,background 0.25s,box-shadow 0.25s;
                    caret-color:#6494f8;
                }
                .field-input::placeholder { color:rgba(130,150,200,0.28); font-weight:300; }
                .field-input:focus {
                    border-color:rgba(100,148,248,0.5);
                    background:rgba(100,148,248,0.05);
                    box-shadow:0 0 0 3px rgba(100,148,248,0.09);
                }

                /* ── SIGNUP LINK ── */
                .signup-row { margin:6px 0 18px; animation:fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
                .signup-link { font-size:12.5px;font-weight:300;color:rgba(155,178,235,0.5);text-decoration:none;transition:color 0.2s; }
                .signup-link:hover { color:#8ab2f8; text-decoration:underline; }

                /* ── BUTTON ── */
                .submit-btn {
                    width:100%; padding:13px 24px; border:none; border-radius:11px;
                    background:linear-gradient(135deg,#2f58e0 0%,#6429cc 100%);
                    color:#fff; font-size:14px; font-family:'DM Sans',sans-serif;
                    font-weight:500; letter-spacing:0.06em; cursor:pointer;
                    position:relative; overflow:hidden;
                    transition:transform 0.18s,box-shadow 0.18s,opacity 0.18s;
                    box-shadow:0 6px 24px rgba(47,88,224,0.4),0 1px 4px rgba(0,0,0,0.5);
                    animation:fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s both;
                }
                .submit-btn::before {
                    content:''; position:absolute; inset:0;
                    background:linear-gradient(135deg,rgba(255,255,255,0.14),transparent 55%);
                    border-radius:inherit;
                }
                .submit-btn:hover:not(:disabled) {
                    transform:translateY(-2px);
                    box-shadow:0 12px 36px rgba(47,88,224,0.55),0 2px 8px rgba(0,0,0,0.4);
                }
                .submit-btn:active:not(:disabled){transform:translateY(0)}
                .submit-btn:disabled{opacity:0.6;cursor:not-allowed}

                .spinner {
                    display:inline-block;width:17px;height:17px;
                    border:2px solid rgba(255,255,255,0.25);border-top-color:#fff;
                    border-radius:50%;animation:spin 0.7s linear infinite;
                }
                @keyframes spin{to{transform:rotate(360deg)}}

                /* ── FOOTER ── */
                .card-footer {
                    display:flex;align-items:center;gap:12px;margin-top:22px;
                    animation:fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.42s both;
                }
                .footer-line{flex:1;height:1px;background:rgba(255,255,255,0.055)}
                .footer-text {
                    font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:0.12em;
                    color:rgba(120,140,190,0.35);white-space:nowrap;
                }
            `}</style>

            <div className="login-root">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
                <div className="particle p1" />
                <div className="particle p2" />
                <div className="particle p3" />
                <div className="particle p4" />
                <div className="particle p5" />

                <div className="login-card">
                    <div className="card-glow-line" />
                    <div className="card-inner-glow" />

                    {/* Header — horizontal layout */}
                    <div className="login-header">
                        <div className="brand-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                        <div className="header-text">
                            <h1 className="login-title">Welcome to <span>ChatApp</span></h1>
                            <p className="login-subtitle">Sign in to continue your conversations</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="field-group">
                            <label className="field-label">Username</label>
                            <div className={`field-wrap ${focusedField === 'username' ? 'focused' : ''}`}>
                                <span className="field-icon">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                                    </svg>
                                </span>
                                <input type="text" placeholder="Enter your username"
                                    className="field-input" value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onFocus={() => setFocusedField('username')}
                                    onBlur={() => setFocusedField(null)} />
                            </div>
                        </div>

                        <div className="field-group">
                            <label className="field-label">Password</label>
                            <div className={`field-wrap ${focusedField === 'password' ? 'focused' : ''}`}>
                                <span className="field-icon">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </span>
                                <input type="password" placeholder="Enter your password"
                                    className="field-input" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)} />
                            </div>
                        </div>

                        <div className="signup-row">
                            <Link to="/signup" className="signup-link">
                                Don't have an account? Sign up
                            </Link>
                        </div>

                        <button className="submit-btn" type="submit" disabled={loading}>
                            {loading ? <span className="spinner" /> : "Sign In"}
                        </button>
                    </form>

                    <div className="card-footer">
                        <div className="footer-line" />
                        <span className="footer-text">Secure Connection</span>
                        <div className="footer-line" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login