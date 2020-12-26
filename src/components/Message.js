import React from "react"

function Message(props) {
    const {msg, isMe, time} = props

    return (

        <div className={ isMe ? "my-text-container" : "your-text-container" }>
            <div className={ `msg-text ${isMe ? "my-text" : "your-text"}` }>
                {msg}
            </div>
        </div>
    )
}

export default Message