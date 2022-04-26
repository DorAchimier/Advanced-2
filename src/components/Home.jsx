import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';

const Home = ({ getDB } ) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const db = getDB();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userDetails = db.find(u => u.username === username)
        if (userDetails && userDetails.password === password) {
            navigate(`/users/${username}`)
        } else {
            alert("Wrong username or password");
        }
    }

    return ( 
        <div className="App">
            <Navbar pageName="Sign Up" pageRef="/Register" extraText="New User?"/>
            <div className="content">
                <div className="create">
                    <h2>Welcome Back!</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Username:</label>
                        <input 
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>Password:</label>
                        <input 
                            type="Password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button>Log In</button>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Home;