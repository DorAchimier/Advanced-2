import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ContactsList from "./ContactsList";
import MessageBox from "./MessageBox";

const MyChat = ( { getDB , getConversation, getLastMessage, getNickname, getUsernames, getNick, addFriend, sendMessage } ) => {
    const { username } = useParams();
    const db = getDB(); 

    const [ pressedContact, setPressedContact ] = useState(null);
    const [ pUsername, setPUsername ] = useState(null);
    const [ numOfSends, setNumOfSends ] = useState(0);
    const userDetails = db.find((u) => u.username === username);

    useEffect(() => {
        {pressedContact && <MessageBox username={username} pressedContact={pressedContact} pUsername={pUsername} getConversation={getConversation} sendMessage={sendMessage} sendHandler={addSend}/>}
    }, [pressedContact, numOfSends]);

    const addSend = () => {
        setNumOfSends(numOfSends + 1);
    }
    
    const clickHandle = (friend) => {
        setPressedContact(getNickname(friend.username));
        setPUsername(friend.username);
    }

    return ( 
        <div className="App">
            <Navbar pageName="Sign Out" pageRef="/" />
            <div className="chat-screen">
                <ContactsList user={userDetails} clickHandle={clickHandle} getLastMessage={getLastMessage} getUsernames={getUsernames} getNickname={getNick} addFriend={addFriend} username={username}/>
                {pressedContact && <MessageBox username={username} pressedContact={pressedContact} pUsername={pUsername}  getConversation={getConversation} sendMessage={sendMessage} sendHandler={addSend}/>}
            </div>
        </div>
     );
}
 
export default MyChat;
