import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';

const Register = ( {addUser, isUsernameTaken} ) => {
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState("");
    const navigate = useNavigate();

    const handleChangePhoto = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {username, nickname, password, photo};
        if (username === "ADMIN" || isUsernameTaken(username)) {
            alert("Username already exists, please pick another one...")
        } else if (password.length < 4) {
            alert("Password should be at least 4 letters long...")
        } else {
            addUser(user)
            navigate(`/users/${username}`)
        }
    }

    return ( 
        <div className="App">
            <Navbar pageName="Sign In" pageRef="/" extraText="Existing User?"/>
            <div className="content">
                <div className="create">
                    <h2>Join Now!</h2>
                    <form >
                        <label>Username:</label>
                        <input 
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>Nickname:</label>
                        <input 
                            type="text"
                            placeholder="Nickname"
                            required
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <label>Password:</label>
                        <input 
                            type="Password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Photo:</label>
                        <input onChange={handleChangePhoto} type="file" name="image" />
                        <br></br>
                        <button onClick={handleSubmit}>Create New User</button>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Register;