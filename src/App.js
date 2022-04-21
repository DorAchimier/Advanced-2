import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import MyChat from './components/MyChat';
import NotFound from './components/NotFound';
import { useState } from "react";

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
    {username: "arod12",nickname: "Aaron",password: "Immunised",contacts: []}, 
]);

const [conversations, setConversations] = useState([
    {key:"titinsky|shavit12", messages:[{id:"1", message:"closed", sender:"shavit12", receiver:"titinsky", time: "12:22"},
    {id:"2",message:"Nooooo", sender:"titinsky", receiver:"shavit12", time: "12:23"},
    {id:"3",message:"https://youtu.be/om4UZCVqdsE", sender:"shavit12", receiver:"titinsky", time: "12:23"}]},

    {key:"titinsky|phoebe", messages:[{id:"4",message:"Hello", sender:"titinsky", receiver:"phoebe", time: "13:22"}]},

    {key:"joker|mj", messages:[{id:"5",message:"Why So Serious?", sender:"joker", receiver:"mj", time: "11:32"},
    {id:"6",message:"You either die a hero, or live long enough to see yourself become the villain.", sender:"mj", receiver:"joker", time: "12:23"},
    {id:"7",message:"..,he's the hero Gotham deserves, but not the one it needs right now. So, we'll hunt him, because he can take it. Because he's not our hero.", sender:"mj", receiver:"joker", time: "12:24"},
    {id:"8",message:"He's a silent guardian. A watchful protector. A Dark Knight.", sender:"mj", receiver:"joker", time: "12:23"},
    {id:"9",message:"https://youtu.be/YTHtEpKBZh4", sender:"joker", receiver:"mj", time: "12:29"},
    {id:"10",message:"https://youtu.be/LAr6oAKieHk", sender:"mj", receiver:"joker", time: "19:53"}]}

]);

  const getDB = () => {
    return db;
  }

  const getConversations = () => {
    return conversations;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home getDB={getDB} getConversations={getConversations}/>}/>
        <Route path="/Register" element={<Register getDB={getDB} getConversations={getConversations}/>}/>
        <Route path="/users/:username" element={<MyChat getDB={getDB} getConversations={getConversations}/>}/>
        <Route path="/users/:username/receiver/:username" element={<MyChat getDB={getDB} getConversations={getConversations}/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
