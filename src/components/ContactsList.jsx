import { useState } from "react";
import AddFriend from "./AddFriend";
const ContactsList = ({user, clickHandle, getLastMessage, getUsernames, getNickname, addFriend}) => {

    const [buttonPopup, setButtonPopup] = useState(false);

    const togglePopup = () => {
        setButtonPopup(!buttonPopup);
    }

    const contacts = user && getLastMessage(user.username, user.contacts);

    return ( 
        <div className="contacts-block">
            <div>
                <div className="add-friend" onClick={() => togglePopup()}>
                <h2>+ Start New Chat</h2>
                </div>
                <AddFriend trigger={buttonPopup} handleClose={togglePopup} getUsernames={getUsernames} getNickname={getNickname} friends={user.contacts + user.username} addFriend={addFriend} username={user.username}/> 
            </div>
            
            {contacts && contacts.map(friend => (
                <div className="contact-preview" key={friend.username} onClick={() => clickHandle(friend)}>
                    <h2>{friend.nickname}</h2>
                    {friend.type === "text" && <h4>{friend.message}</h4>}
                    {friend.type !== "text" && <h4>{friend.type}</h4>}
                    <img src={friend.photo} width="100" height="100" alt="profile-pic"/>
                    <div className="contact-preview-time">{friend.time}</div>
                </div>
            ))}
        </div>
        
     );
}
 
export default ContactsList;

