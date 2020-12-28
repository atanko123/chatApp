import React from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"

// Components
import Message from "./Message"

// test data
import testData from '../testData'

function GetMessages(props) {
    const TEST_MESSAGES = props.test_messages
    const firestore = props.firestore
    const user = props.user

    let messages = [];
    const messageID = firestore.collection("messages")
    //console.log("MsgID:", messageID)

    const query = messageID.orderBy("time").limit(20)

    messages = useCollectionData(query,  {idField: "id"})
  
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
      <div>{ showContent }</div>
    )
  }

export default GetMessages