import React, { Component } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"

// Components
import Message from "./Message"

// test data
import testData from '../testData'

class GetMessages extends React.Component {

    messagesEndRef = React.createRef()

    componentDidMount () {
      this.scrollToBottom()
    }
    componentDidUpdate () {
      this.scrollToBottom()
    }
    scrollToBottom = () => {
        const a = this.messagesEndRef.current
        a.scrollIntoView({ behavior: 'smooth' })
    }
    render() {
        const TEST_MESSAGES = this.props.test_messages
        const firestore = this.props.firestore
        const user = this.props.user
        
    
        let messages = [];
        if (TEST_MESSAGES) {
          messages.push(testData)
        } else {
          const messageID = firestore.collection("messages")
          //console.log("MsgID:", messageID)
        
          const query = messageID.orderBy("time").limit(20)
        
          messages = useCollectionData(query,  {idField: "id"})
        }
      
        let showContent = null
        if (messages[0] !== undefined) {
          showContent = messages[0].map(msg => {
            const isMe = user && user.uid === msg.userID
    
            //console.log("DATE:", msg.time.toDate())
            const msgPic = (() => {
                if (isMe) {
                    return user.photoURL
                }
            })()
      
            return (
              <Message
                key={Math.random()}
                msg={msg.message}
                isMe={isMe}
                time={msg.time}
                photoURL={msgPic}
              />
            )
          })
        }
      
        return (
            <div>
                { showContent }
                <div ref={this.messagesEndRef} />
            </div>
        )
    }
  }

export default GetMessages