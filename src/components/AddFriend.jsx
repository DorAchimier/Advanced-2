import { useState } from "react";

const AddFriend = ( {trigger, handleClose, getUsernames, getNickname, friends, addFriend, username} ) => {
    const [query, setQuery] = useState("");

    const getFilteredItems = (q, items) => {
        if (q === "") {
            return items;
        }
        return items.filter(u => u.includes(query));
    }

    const filteredItems = getFilteredItems(query, getUsernames().filter(n => !friends.includes(n)));

    return ( 
        trigger ? 
        (<div className='popup'>
            <div className='popup-inner'>
                <button onClick={() => handleClose()}>X</button>
                <br></br>
                <br></br>
                <input trype="text" placeholder="Enter Username..." onChange={(e) => setQuery(e.target.value)}></input>
                {filteredItems && filteredItems.map(friend => (
                <div className="contact-search-preview" key={friend}>
                    <h2>{getNickname(friend)}</h2>
                    <h4>{friend}</h4>
                    <br></br>
                    <button onClick={() => addFriend(username, friend)}>+Add</button>
                </div>
            ))}
            </div>
        </div>) : ""
     );
}
 
export default AddFriend;