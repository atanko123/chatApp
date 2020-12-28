import React from "react"

// Images
import avatar from "../images/avatar.png"

function Message(props) {
    const {msg, isMe, time, photoURL} = props
    let profilePic = avatar
    if (photoURL) {
        profilePic = photoURL
    }

    return (

        <div className={ isMe ? "my-text-container" : "your-text-container" }>
            <div className={ `${isMe ? "pic-right" : "pic-left"}`}>
                <img className="msg-pic" src={profilePic} alt=":)" />
            </div>
            <div className={ `msg-text ${isMe ? "my-text" : "your-text"}` }>
                {msg}
                <div className="msg-date">
                    25/23/2020 17:12
                </div>
            </div>
        </div>
    )
}

export default Message