import React from "react"

// Images
import avatar from "../images/avatar.png"

function parseDate(time) {

    if (time) {
        const d = time.toDate().toString().split(" ")
        const t = d[4].split(":")
        return `${d[2]}/${d[1]}/${d[3]} ${t[0]}:${t[1]}`
    }

    return null
}

function Message(props) {
    const {msg, isMe, time, photoURL} = props
    let profilePic = avatar
    if (photoURL) {
        profilePic = photoURL
    }
    const date = parseDate(time)

    return (

        <div className={ isMe ? "my-text-container" : "your-text-container" }>
            <div className={ `${isMe ? "pic-right" : "pic-left"}`}>
                <img className="msg-pic" src={profilePic} alt=":)" />
            </div>
            <div className={ `msg-text ${isMe ? "my-text" : "your-text"}` }>
                {msg}
                <div className="msg-date">
                    { date }
                </div>
            </div>
        </div>
    )
}

export default Message