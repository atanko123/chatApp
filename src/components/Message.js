import React, { Component } from "react"

// Images
import avatar from "../images/avatar.png"

class Message extends Component {

    constructor() {
        super()
        this.state = {
            showName: false
        }
    }

    parseDate(time) {
        if (time) {
            const d = time.toDate().toString().split(" ")
            const t = d[4].split(":")
            return `${d[2]}/${d[1]}/${d[3]} ${t[0]}:${t[1]}`
        }
    
        return null
    }

    mouseOverHandler(e) {
        e.preventDefault()
        if (!this.state.showName) {
            this.setState({
                showName: true
            })
        }
    }

    mouseLeaveHandler(e) {
        e.preventDefault()
        if (this.state.showName) {
            this.setState({
                showName: false
            })
        }
    }

    render() {
        const {
            msg,
            isMe,
            time,
            photoURL,
            last,
            name
        } = this.props

        const profilePic = (() => {
            return photoURL ? photoURL : avatar
        })()
        const date = this.parseDate(time)

        return (

            <div className={ `${last} ${isMe ? "my-text-container" : "your-text-container"}` }>
                <div className={ `${isMe ? "pic-right" : "pic-left"}`}>
                    <img className="msg-pic" src={profilePic} alt=":)" />
                </div>
                <div onMouseOver={(e) => this.mouseOverHandler(e)}
                    onMouseLeave={(e) => this.mouseLeaveHandler(e)}
                    className={ `msg-text ${isMe ? "my-text" : "your-text"}` }>
                    {msg}
                    <div className="msg-date">
                        {date}
                    </div>
                </div>
                { this.state.showName && 
                    <div className={ `${isMe ? "my-name" : "your-name"}`}>{name}</div> 
                }
            </div>
        )
    }
}

export default Message