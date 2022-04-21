import useFetch from "./useFetch";
const ContactsList = ({username, clickHandle, getDB, getConversations}) => {


    const db = getDB();
    const contacts = username.contacts
    // const contacts = data.find(un => un === username).contacts;
    return ( 
        <div className="contacts-block">
            {contacts && contacts.map(friend => (
                <div className="contact-preview" key={friend} onClick={() => clickHandle(friend)}>
                    <h2>{db.find(u => u.username === friend).nickname}</h2>
                    <h4>Why so serious?????????????????????????</h4>
                    <div className="contact-preview-time">12:22</div>
                </div>
            ))}
        </div>
        
     );
}
 
export default ContactsList;

