import React from 'react'

const GenderCheckbox = ({ onCheckBoxChange, selectedGender }) => {
    return (
        <>
            <style>{`
                .gender-section { margin: 4px 0 20px; }
                .gender-label-row {
                    display: block;
                    font-size: 11px; font-weight: 500;
                    text-transform: uppercase; letter-spacing: 0.12em;
                    color: rgba(150,170,215,0.55);
                    margin-bottom: 10px;
                    font-family: 'DM Sans', sans-serif;
                }
                .gender-options {
                    display: flex;
                    gap: 12px;
                }
                .gender-option {
                    flex: 1;
                    position: relative;
                    cursor: pointer;
                }
                .gender-option input[type='checkbox'] {
                    position: absolute;
                    opacity: 0;
                    width: 0; height: 0;
                    pointer-events: none;
                }
                .gender-pill {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;
                    padding: 11px 16px;
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.065);
                    background: rgba(255,255,255,0.035);
                    transition: border-color 0.22s, background 0.22s, box-shadow 0.22s, transform 0.18s;
                    cursor: pointer;
                    user-select: none;
                }
                .gender-option:hover .gender-pill {
                    border-color: rgba(100,148,248,0.3);
                    background: rgba(100,148,248,0.04);
                    transform: translateY(-1px);
                }
                .gender-option input:checked ~ .gender-pill {
                    border-color: rgba(100,148,248,0.55);
                    background: rgba(100,148,248,0.09);
                    box-shadow: 0 0 0 3px rgba(100,148,248,0.09), inset 0 1px 0 rgba(255,255,255,0.06);
                }

                /* Icon circle */
                .gender-icon {
                    width: 28px; height: 28px;
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    transition: background 0.22s, box-shadow 0.22s;
                }
                .gender-icon-male {
                    background: rgba(59,130,246,0.12);
                    border: 1px solid rgba(59,130,246,0.2);
                }
                .gender-icon-female {
                    background: rgba(180,100,240,0.12);
                    border: 1px solid rgba(180,100,240,0.2);
                }
                .gender-option input:checked ~ .gender-pill .gender-icon-male {
                    background: rgba(59,130,246,0.22);
                    box-shadow: 0 0 10px rgba(59,130,246,0.25);
                }
                .gender-option input:checked ~ .gender-pill .gender-icon-female {
                    background: rgba(180,100,240,0.22);
                    box-shadow: 0 0 10px rgba(180,100,240,0.25);
                }
                .gender-icon svg { width:14px; height:14px; }

                /* Text */
                .gender-text {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 14px; font-weight: 400;
                    color: rgba(170,185,225,0.55);
                    transition: color 0.22s;
                    letter-spacing: 0.01em;
                }
                .gender-option input:checked ~ .gender-pill .gender-text {
                    color: #d8e0f4;
                }

                /* Custom checkmark dot */
                .gender-check {
                    width: 16px; height: 16px;
                    border-radius: 50%;
                    border: 1.5px solid rgba(255,255,255,0.12);
                    margin-left: auto;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    transition: border-color 0.22s, background 0.22s;
                }
                .gender-check-inner {
                    width: 7px; height: 7px;
                    border-radius: 50%;
                    background: transparent;
                    transition: background 0.22s, transform 0.22s;
                    transform: scale(0);
                }
                .gender-option input:checked ~ .gender-pill .gender-check {
                    border-color: #6494f8;
                }
                .gender-option input:checked ~ .gender-pill .gender-check-inner {
                    background: #6494f8;
                    transform: scale(1);
                }
            `}</style>

            <div className="gender-section">
                <span className="gender-label-row">Gender</span>
                <div className="gender-options">

                    {/* Male */}
                    <label className="gender-option">
                        <input
                            type="checkbox"
                            checked={selectedGender === 'male'}
                            onChange={() => onCheckBoxChange('male')}
                        />
                        <div className="gender-pill">
                            <div className="gender-icon gender-icon-male">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    style={{ color: '#60a5fa' }}>
                                    <circle cx="10" cy="14" r="5" />
                                    <path d="M19 5l-5.4 5.4M19 5h-5M19 5v5" />
                                </svg>
                            </div>
                            <span className="gender-text">Male</span>
                            <div className="gender-check">
                                <div className="gender-check-inner" />
                            </div>
                        </div>
                    </label>

                    {/* Female */}
                    <label className="gender-option">
                        <input
                            type="checkbox"
                            checked={selectedGender === 'female'}
                            onChange={() => onCheckBoxChange('female')}
                        />
                        <div className="gender-pill">
                            <div className="gender-icon gender-icon-female">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    style={{ color: '#c084fc' }}>
                                    <circle cx="12" cy="9" r="5" />
                                    <path d="M12 14v6M9 17h6" />
                                </svg>
                            </div>
                            <span className="gender-text">Female</span>
                            <div className="gender-check">
                                <div className="gender-check-inner" />
                            </div>
                        </div>
                    </label>

                </div>
            </div>
        </>
    )
}

export default GenderCheckbox