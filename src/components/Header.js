import React from "react"
// Images
import avatar from '../images/avatar.png';
import logout from '../images/logout.png';

function Header(props) {
    const user = props.user
    let profilePicture = avatar
    let userName = "Guest"

    if (user) {
        profilePicture = user.photoURL
        userName = user.displayName
    }

    return (
        <header className="Header">
            {userName}
            <img className="profile-pic" src={profilePicture} alt=":)" />
            { user && props.signOut }
        </header>
    )
}

export default Header