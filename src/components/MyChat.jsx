import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ContactsList from "./ContactsList";
import MessageBox from "./MessageBox";
import useFetch from "./useFetch";

const MyChat = ( { getDB , getConversations } ) => {
    const { username } = useParams();
    const db = getDB(); 

    const [ pressedContact, setPressedContact ] = useState(null);
    const [ pUsername, setPUsername ] = useState(null);

    const userDetails = db.find((u) => u.username === username);
    const data = [{id:"5",message:"Why So Serious?", sender:"joker", receiver:"mj", time: "11:32"},
    {id:"6",message:"You either die a hero, or live long enough to see yourself become the villain.", sender:"mj", receiver:"joker", time: "12:23"},
    {id:"7",message:"..,he's the hero Gotham deserves, but not the one it needs right now. So, we'll hunt him, because he can take it. Because he's not our hero.", sender:"mj", receiver:"joker", time: "12:24"},
    {id:"8",message:"He's a silent guardian. A watchful protector. A Dark Knight.", sender:"mj", receiver:"joker", time: "12:23"},
    {id:"9",message:"https://youtu.be/YTHtEpKBZh4", sender:"joker", receiver:"mj", time: "12:29"},
    {id:"10",message:"https://youtu.be/LAr6oAKieHk", sender:"mj", receiver:"joker", time: "19:53"}];
    useEffect(() => {
        {pressedContact && <MessageBox username={username} pressedContact={pressedContact} pUsername={pUsername} getConversations={getConversations} data={data}/>}
    }, [pressedContact]);
    
    const clickHandle = (friend) => {
        setPressedContact(db.find((u) => u.username === friend).nickname);
        setPUsername(friend);
    }

    return ( 
        <div className="App">
            <Navbar pageName="Sign Out" pageRef="/" extraText={"Hello " + username + "!"}/>
            <div className="chat-screen">
                <ContactsList username={userDetails} clickHandle={clickHandle} getDB={getDB} getConversations={getConversations}/>
                {pressedContact && <MessageBox username={username} pressedContact={pressedContact} pUsername={pUsername} getConversations={getConversations} data={data}/>}
            </div>
        </div>
     );
}
 
export default MyChat;