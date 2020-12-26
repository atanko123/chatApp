import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app';
import "firebase/firestore"
import "firebase/auth"

import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"

// Components
import Header from "./components/Header"
import Message from "./components/Message"

// Images
import logout from './images/logout.png';

// Firebase config credentials (declared in .env)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

// Connect to Firebase db
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const firestore = firebase.firestore()



function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }
  return (
    <button onClick={signInWithGoogle}>Sign In with Google</button>
  )
}

function GetMessages() {
  const messageID = firestore.collection("messages")
  //console.log("MsgID:", messageID)

  const query = messageID.orderBy("time").limit(20)

  const messages = useCollectionData(query,  {idField: "id"})

  const user = auth.currentUser
  let showContent = null
  if (messages[0] !== undefined) {
    showContent = messages[0].map(msg => {
      const isMe = user && user.uid === msg.userID

      return <Message key={Math.random()} msg={msg.message} isMe={isMe}/>
    })
  }

  return (
    <div>{ showContent }</div>
  )
}

function SendMessage() {
  const addMessage = async () => {
    const collectionName = firestore.collection("messages")
    const user = auth.currentUser

    await collectionName.add({
      message: `Random num added: ${Math.random()}`,
      userID: user.uid,
      time: firebase.firestore.FieldValue.serverTimestamp()
    })
  }
  return (
    <button onClick={addMessage}>Send message</button>
  )
}

function SignOut() {
  const signOutFromGoogle = () => {
    if (auth.currentUser) {
      auth.signOut()
    }
  }
  
  return (
    <img
      className="logout-pic"
      src={logout}
      alt=":)"
      onClick={signOutFromGoogle}
    /> 
  )
}


function App() {
  const [user] = useAuthState(auth)
  console.log(user)

  return (
    <div className="App">
      <Header user={user} signOut={<SignOut />}/>  
      {user == null && <SignIn /> }

      {user ? <GetMessages /> : null }
      {user ? <SendMessage /> : null }
    </div>
  );
}


export default App;
