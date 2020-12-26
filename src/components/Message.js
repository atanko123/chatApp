import React from "react"

function Message(props) {
    const {msg, isMe} = props
    let a = "TI";
    if (isMe) {
        a = "JAZ"
    }
    return (

        <div className={ isMe ? "my-text-container" : "your-text-container" }>
            <div className={ `msg-text ${isMe ? "my-text" : "your-text"}` }>{msg}: {a}</div>
        </div>
    )
}

export default Message