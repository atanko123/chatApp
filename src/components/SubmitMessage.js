import React, {Component} from "react"

class SubmitMessage extends Component {

    constructor() {
        super()
        this.state = {
            text: ""
        }
    }

    onTextChange = event => {
        event.preventDefault()
        this.setState({
            text: event.target.value
        })
    }

    cleanStateText = () => {
        this.setState({
            text: ""
        })
    }

    render() {
        return (
            <footer className="footer-style">
                <input 
                    className="input-style"
                    placeholder="Write message..."
                    value={this.state.text}
                    onChange={e => this.onTextChange(e)}
                />
                <button
                    className="send-btn"
                    onClick={() => {
                            this.cleanStateText()
                            this.props.sendMsg(this.state.text)
                        }}>
                        Send
                </button>
            </footer>
        )
    }
}

export default SubmitMessage