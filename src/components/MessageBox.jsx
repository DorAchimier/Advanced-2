import { useState } from "react";
import UploadPopUp from "./UploadPopUp";
import Recorder from "./Recorder";

const MessageBox = ({ username , pressedContact , pUsername , getConversation, sendMessage, sendHandler, getPhoto}) => {
    const [msg, setMsg] = useState('');
    const s = "sent";
    const r = "received";
    const [photo, setPhoto] = useState(null);
    let mid;

    const [buttonPopup1, setButtonPopup1] = useState(false);
    const [buttonPopup2, setButtonPopup2] = useState(false);
    const [buttonPopup3, setButtonPopup3] = useState(false);
   
    const togglePopup1 = () => {
        setButtonPopup1(!buttonPopup1);
    }

    const togglePopup2 = () => {
        setButtonPopup2(!buttonPopup2);
    }

    const togglePopup3 = () => {
        setButtonPopup3(!buttonPopup3);
    }

    const close1 = (t) => {
        setButtonPopup1(!buttonPopup1);
        sendFile(username, pUsername, t);
    }

    const close2 = (t) => {
        setButtonPopup2(!buttonPopup2);
        sendFile(username, pUsername, t);
    }

    const close3 = (t) => {
        setButtonPopup3(!buttonPopup3);
        sendAudio(username, pUsername);
    }

    const con = getConversation(username,pUsername);

    const send = (u1, u2, m) => {
        if (!m || !m.trim().length) {return}
        sendMessage(u1, u2, m, "text");
        sendHandler();
    }

    const sendFile = (u1, u2, t) => {
        if (photo) {
            sendMessage(u1, u2, photo, t);
            sendHandler();
            setPhoto(null);
        }
    }

    const sendAudio = (u1, u2) => {
        if (audio) {
            sendMessage(u1, u2, audio, "audio");
            sendHandler();
            setAudio(null);
        }
    }

    const handleChangePhoto = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
    } 

    const [audio, setAudio] = useState(null);

    return ( 
        
        <div className="message-box">
            <div className="message-box-contact">
                <h2>{pressedContact}</h2>
                <img src={getPhoto(pUsername)} width="100" height="100"/>
            </div>
            <textarea type="text" placeholder="Type here..." onChange={(e) => setMsg(e.target.value)}/>
            <button onClick={() => send(username, pUsername, msg)}>Send</button>
            
            <div className="upload">
                <button onClick={() => togglePopup1()}>Picture</button>
                <button onClick={() => togglePopup2()}>Video</button>
                <button onClick={() => togglePopup3()}>Record</button>
            </div>
           
                <UploadPopUp trigger={buttonPopup1} handleSend={close1} handleChangePhoto={handleChangePhoto} name="img" handleClose={togglePopup1}/>

                <UploadPopUp trigger={buttonPopup2} handleSend={close2} handleChangePhoto={handleChangePhoto} name="video" handleClose={togglePopup2}/>

                <Recorder trigger={buttonPopup3} handleSend={close3} handleChange={setAudio} name="audio" handleClose={togglePopup3}/>
            
            <div className="message-box-conversation">
                {con.map(msgDetails => ( 
                    <div className="message" key={msgDetails.id}>
                        <div className="disappear">
                        {(msgDetails.sender === pUsername) ? mid = r : mid = s}
                        {(msgDetails.sender === "ADMIN") ? mid = "admin" : mid}
                        </div>
                        {msgDetails.type === "text" && <div className={`message ${mid}`}>{msgDetails.message}</div>}
                        
                        {msgDetails.type === "img" && <div className={`message ${mid}`}><img src={msgDetails.message} width="100" height="100"/></div>}
                        {msgDetails.type === "video" && <div className={`message ${mid}`}><video src={msgDetails.message}  width="320" height="240" controls/></div> }
                        {console.log(msgDetails.message)}
                        <div className={`message ${mid}-time`}>{msgDetails.time}</div>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default MessageBox;