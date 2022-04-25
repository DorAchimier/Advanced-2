import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import MyChat from './components/MyChat';
import NotFound from './components/NotFound';
import { useState } from "react";
import AddFriend from './components/AddFriend';

function App() {

  const [db, setDb] = useState([
    {username: "titinsky",nickname: "Amnon",password: "Free",contacts: ["shavit12", "phoebe"]},
    {username: "mj",nickname: "Michael Jordan",password: "MJ23",contacts: ["d12", "joker", "avi_r", "skankhunter42", "s_cheeks"]},
    {username: "joker",nickname: "Arthur Fleck",password: "arkham!23",contacts: ["d12", "mj", "avi_r", "skankhunter42", "s_cheeks"]},
    {username: "d12",nickname: "David",password: "1234",contacts: ["mj", "joker", "avi_r", "skankhunter42", "s_cheeks"]},
    {username: "skankhunter42",nickname: "Gerald",password: "E987#",contacts: ["phoebe", "d12", "joker", "avi_r", "mj", "s_cheeks"]},
    {username: "s_cheeks",nickname: "Sandy",password: "KARATE",contacts: ["d12", "joker", "avi_r", "skankhunter42", "mj"]},
    {username: "avi_r",nickname: "Avi",password: "12883",contacts: ["d12", "joker", "mj", "skankhunter42", "s_cheeks"]},
    {username: "shavit12",nickname: "Kochava",password: "closed",contacts: ["titinsky", "phoebe"]},
    {username: "phoebe",nickname: "Lisa",password: "Sme!1yCat",contacts: ["titinsky", "shavit12", "skankhunter42"]},
    {username: "arod12",nickname: "Aaron",password: "Immunised",contacts: []} 
]);

const [conversations, setConversations] = useState([
    {key:"titinsky|shavit12", messages:[{id:"1", message:"closed", sender:"shavit12", receiver:"titinsky", time: "12:22"},
    {id:"2",message:"Nooooo", sender:"titinsky", receiver:"shavit12", time: "12:23"},
    {id:"3",message:"https://youtu.be/om4UZCVqdsE", sender:"shavit12", receiver:"titinsky", time: "12:23"}]},

    {key:"titinsky|phoebe", messages:[{id:"1",message:"Hello", sender:"titinsky", receiver:"phoebe", time: "13:22"}]},

    {key:"mj|d12", messages:[{id:"1",message:"Hello", sender:"mj", receiver:"d12", time: "13:02"},
    {id:"2",message:"Aloha", sender:"d12", receiver:"mj", time: "13:09"},
    {id:"3",message:"Ola", sender:"d12", receiver:"mj", time: "13:29"},
    {id:"4",message:"Prazer em conhecer voce", sender:"d12", receiver:"mj", time: "13:29"},
    {id:"5",message:"???", sender:"mj", receiver:"d12", time: "13:33"},
    {id:"6",message:"(:", sender:"d12", receiver:"mj", time: "13:33"},
    {id:"7",message:"???", sender:"mj", receiver:"d12", time: "13:33"},]},

    {key:"joker|mj", messages:[{id:"1",message:"Why So Serious?", sender:"joker", receiver:"mj", time: "11:32"},
    {id:"2",message:"You either die a hero, or live long enough to see yourself become the villain.", sender:"mj", receiver:"joker", time: "12:23"},
    {id:"3",message:"..,he's the hero Gotham deserves, but not the one it needs right now. So, we'll hunt him, because he can take it. Because he's not our hero.", sender:"mj", receiver:"joker", time: "12:24"},
    {id:"4",message:"He's a silent guardian. A watchful protector. A Dark Knight.", sender:"mj", receiver:"joker", time: "12:23"},
    {id:"5",message:"https://youtu.be/YTHtEpKBZh4", sender:"joker", receiver:"mj", time: "12:29"},
    {id:"6",message:"https://youtu.be/LAr6oAKieHk", sender:"mj", receiver:"joker", time: "19:53"}]}

]);

  const getDB = () => {
    return db;
  }

  const getUsernames = () => {
    var arr = [];
    db.map((e) => {arr.push(e.username)})
    return arr;
  }

  const getConversations = () => {
    return conversations;
  }

  const getConversation = (username1, username2) => {
    var key1 = `${username1}|${username2}`;
    var key2 = `${username2}|${username1}`;
    const val = conversations.find((t) => t.key === key1 || t.key === key2)
    if (val) {
      return val.messages; 
    }
    return [{id:"1", message:"Waiting for messages...", sender:"ADMIN", receiver:"ADMIN", time:""}];
  } 

  const doesConvoExist = (username1, username2) => {
    var key1 = `${username1}|${username2}`;
    var key2 = `${username2}|${username1}`;
    const val = conversations.find((t) => t.key === key1 || t.key === key2)
    return !!(val);
  }

  const getNickname = (username) => {
    return db.find((u) => u.username === username).nickname
  }

  const getLastMessage = (username, friends) => {
    let ans = [];
    friends && friends.map((friend) => {
      var convo = getConversation(username,friend).slice(-1);
      if (convo && convo.sender !== "ADMIN") {
        var temp = {username:friend, nickname:getNickname(friend), message:convo.at(0).message, time:convo.at(0).time};
        ans.push(temp);
      } else {
        ans.push({username:friend, nickname:getNickname(friend) , message:"", time:""})
      }
    })
    return ans;
  }

  const addUser = (user) => {
    db.push({username:user.username, nickname:user.nickname, password:user.password, contacts:[]})
  }

  const isUsernameTaken = (username) => {
    if (username === "ADMIN") {return true}
    return !!(db.find(un => un.username === username));
  }

  const addFriend = (myUsername, friendUsername) => {
    !db.find((u) => u.username === myUsername).contacts.includes(friendUsername) && 
      db.find((u) => u.username === myUsername).contacts.push(friendUsername);
  }

  const getTimeStamp = () => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
  }

  const getNextKey = (messageDetails) => {
    console.log(messageDetails["id"]);
    return messageDetails["id"] + 1;
  }

  const sendMessage = (fromUsername, toUsername, msg, timeStamp) => {
    if (!doesConvoExist(fromUsername, toUsername)) {
      addFriend(fromUsername, toUsername);
      addFriend(toUsername, fromUsername);
      conversations.push({key:`${fromUsername}|${toUsername}`, messages:[{id:"1", message:msg, sender:fromUsername, receiver:toUsername, time: getTimeStamp()}]})
    } else {
      var key1 = `${fromUsername}|${toUsername}`;
      var key2 = `${toUsername}|${fromUsername}`;
      const con = conversations.find((t) => t.key === key1 || t.key === key2)
      var mKey = con.messages.length + 1;
      con.messages.push({id:mKey.toString(), message:msg, sender:fromUsername, receiver:toUsername, time: getTimeStamp()})
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home getDB={getDB} />}/>
        <Route path="/Register" element={<Register addUser={addUser} isUsernameTaken={isUsernameTaken}/>}/>
        <Route path="/users/:username" element={<MyChat getDB={getDB} getConversations={getConversations} getConversation={getConversation} getLastMessage={getLastMessage} getNickname={getNickname} getUsernames={getUsernames} getNick={getNickname} addFriend={addFriend} sendMessage={sendMessage}/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
