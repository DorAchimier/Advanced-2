import { useState, useEffect} from "react";
import UploadPopUp from "./UploadPopUp";
import Recorder from "./Recorder";
import axios from "axios";

const MessageBox = ({ username , pressedContact , pUsername , getConversation, sendMessage, sendHandler, getPhoto}) => {
    const [msg, setMsg] = useState('');
    const s = "sent";
    const r = "received";
    const [photo, setPhoto] = useState(null);
    let mid;
    let url1 = 'https://localhost:7033/api/'
    let url2 = '/contacts/'
    let url3 =  '/messages'

    const [buttonPopup1, setButtonPopup1] = useState(false);
    const [buttonPopup2, setButtonPopup2] = useState(false);
    const [buttonPopup3, setButtonPopup3] = useState(false);
    const [messages, setMessages] = useState([]);
   
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

    const close3 = (a) => {
        setButtonPopup3(!buttonPopup3);
        sendAudio(username, pUsername, a);
    }

    const con = getConversation(username,pUsername);
    const [refresh, setRefresh] = useState(0);
    const send = (m) => {
        if (!m || !m.trim().length) {return}
        var myUrl = url1 + username + url2 + pressedContact + url3 + "?message=" + m;
        axios.post(myUrl);
        refresh = setRefresh(refresh + 1);
        sendHandler();
    }

    const sendFile = (u1, u2, t) => {
        if (photo) {
            sendMessage(u1, u2, photo, t);
            sendHandler();
            setPhoto(null);
        }
    }

    const sendAudio = (u1, u2, a) => {
        sendMessage(u1, u2, a, "audio");
        sendHandler();
    }

    const handleChangePhoto = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
    } 

    useEffect(() => { 
        console.log(url1 + username + url2 + pressedContact + url3);
        axios.get(url1 + username + url2 + pressedContact + url3).then(res => {
            console.log(res)
            setMessages(res.data.messages)
        }).catch(err => {console.log(err)})
    }, [refresh]);

    return ( 
        
        <div className="message-box">
            <div className="message-box-contact">
                <h2>{pressedContact}</h2>
                {/* <img src={getPhoto(pUsername)} width="100" height="100"/> */}
            </div>
            <textarea type="text" placeholder="Type here..." onChange={(e) => setMsg(e.target.value)}/>
            <button onClick={() => send(msg)}>Send</button>
            
            {/* <div className="upload">
                <button onClick={() => togglePopup1()}>Picture</button>
                <button onClick={() => togglePopup2()}>Video</button>
                <button onClick={() => togglePopup3()}>Record</button>
            </div> */}
           
                {/* <UploadPopUp trigger={buttonPopup1} handleSend={close1} handleChangePhoto={handleChangePhoto} name="img" handleClose={togglePopup1}/>

                <UploadPopUp trigger={buttonPopup2} handleSend={close2} handleChangePhoto={handleChangePhoto} name="video" handleClose={togglePopup2}/>

                <Recorder trigger={buttonPopup3} handleSend={close3} handleClose={togglePopup3}/> */}
            
            <div className="message-box-conversation">
                {messages && messages.map(msgDetails => ( 
                    <div className="message" key={msgDetails.id}>
                        <div className="disappear">
                        {(msgDetails.sender === pressedContact) ? mid = r : mid = s}
                        {(msgDetails.sender === "ADMIN") ? mid = "admin" : mid}
                        </div>
                        {msgDetails.text !== "" && <div className={`message ${mid}`}>{msgDetails.text}</div>}

                        {/* {msgDetails.type === "img" && <div className={`message ${mid}`}><img src={msgDetails.message} width="250" height="350" alt="img"/></div>}
                        {msgDetails.type === "video" && <div className={`message ${mid}`}><video src={msgDetails.message}  width="320" height="240" controls/></div> }
                        {msgDetails.type === "audio" && <div className={`message ${mid}`}><audio src={msgDetails.message} controls/></div> } */}

                        <div className={`message ${mid}-time`}>{msgDetails.time}</div>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default MessageBox;