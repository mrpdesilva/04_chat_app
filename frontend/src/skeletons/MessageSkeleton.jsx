const MessageSkeleton = () => {
    return (
        <>
            {/* Incoming */}
            <div className="skel-row">
                <div className="skel-avatar" />
                <div className="skel-content">
                    <div className="skel-line skel-w1" />
                    <div className="skel-line skel-line-sm skel-w2" style={{ animationDelay: '0.15s' }} />
                </div>
            </div>

            {/* Outgoing */}
            <div className="skel-row skel-end">
                <div className="skel-avatar" style={{ animationDelay: '0.1s' }} />
                <div className="skel-content">
                    <div className="skel-line skel-w3" style={{ animationDelay: '0.2s' }} />
                </div>
            </div>
        </>
    )
}

export default MessageSkeleton