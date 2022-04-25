import { useState } from "react";

const MessageBox = ({ username , pressedContact , pUsername , getConversation, sendMessage, sendHandler}) => {
    const [msg, setMsg] = useState('');
    const s = "sent";
    const r = "received";
    let mid;

    const con = getConversation(username,pUsername);

    const send = (u1, u2, m) => {
        if (!m.trim().length) {return}
        sendMessage(u1, u2, m);
        sendHandler();
    }
    
    return ( 
        <div className="message-box">
            <div className="message-box-contact">
                <h2>{pressedContact}</h2>
            </div>
            <textarea type="text" placeholder="Type here..." onChange={(e) => setMsg(e.target.value)}/>
            <button onClick={() => send(username, pUsername, msg)}>send</button>
            <div className="message-box-conversation">
                {con.map(msgDetails => ( 
                    <div className="message" key={msgDetails.id}>
                        <div className="disappear">
                        {(msgDetails.sender === pUsername) ? mid = r : mid = s}
                        {(msgDetails.sender === "ADMIN") ? mid = "admin" : mid}
                        </div>
                        <div className={`message ${mid}`}>{msgDetails.message}</div>
                        <div className={`message ${mid}-time`}>{msgDetails.time}</div>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default MessageBox;
