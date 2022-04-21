
const MessageBox = ({ username , pressedContact , pUsername , getConversations, data}) => {
    const c = getConversations().filter(m => m.key === `${username}|${pUsername}` || m.key === `${pUsername}|${username}`);

    const s = "sent";
    const r = "received";
    let mid;

    
    return ( 
        <div className="message-box">
            <div className="message-box-contact">
                <h2>{pressedContact}</h2>
            </div>
            <textarea type="text" placeholder="Type here..."/>
            <button>send</button>
            <div className="message-box-conversation">
                {data.map(msgDetails => ( 
                    <div className="message" key={msgDetails.id}>
                        <div className="disappear">
                        {(msgDetails.sender === pUsername) ? mid = r : mid = s}
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


// <div className="message received">Hesssssssssssssssssssssssssssssssssssssso</div>
// <div className="message receive-time">12:22</div>
// <div className="message received">Hello</div>
// <div className="message receive-time">12:22</div>
// <div className="message sent">009</div>
// <div className="message sent-time">12:22</div>