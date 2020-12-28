import './App.css';
import firebase from 'firebase/app';
import "firebase/firestore"
import "firebase/auth"

import { useAuthState } from "react-firebase-hooks/auth"

// Components
import Header from "./components/Header"
import SubmitMessage from "./components/SubmitMessage"
import GetMessages from "./components/GetMessages"

// Images
import logout from './images/logout.png';
import Google from './images/google.png';

const TEST_MESSAGES = true
const ENABLE_SUBMIT = false



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
    <img 
      className="google-signin"
      onClick={signInWithGoogle}
      src={Google}
      alt="Sign in with google"/>
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

function sendMessage(text) {
  const msg = text.trim()
  if (msg === "") {
    console.log("Message is empty")
  }
  else {
    if (!ENABLE_SUBMIT) {
      alert("Test mode on")
    } else {
      const addMessage = (async () => {
        const collectionName = firestore.collection("messages")
        const user = auth.currentUser
    
        await collectionName.add({
          message: msg,
          userID: user.uid,
          time: firebase.firestore.FieldValue.serverTimestamp()
        })
      })()
    }
  }
}

function App() {
  const [user] = useAuthState(auth)
  console.log(user)

  return (
    <div className="App">
      <Header user={user} signOut={<SignOut />} />  
      {user == null && <SignIn /> }
      <div className="contariner"></div>
      {user && <GetMessages
        user={user}
        firestore={firestore}
        test_messages={TEST_MESSAGES}/> }
      {user && <SubmitMessage sendMsg={sendMessage}/> }
    </div>
  );
}


export default App;
