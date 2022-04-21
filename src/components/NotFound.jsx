import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const NotFound = () => {
    return ( 
        <div className="App">
            <Navbar pageName="Home" pageRef="/" extraText="404: Not Found"/>
            <div className="not-found">
                <h2 color="#f1356d">Sorry</h2>
                <p>404: The page cannot be found</p>
                <button><Link to="/">Take me home...</Link></button>
                <div className="take-me-home">
                    <iframe width="360" height="315" src="https://www.youtube.com/embed/1vrEljMfXYo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
     );
}
 
export default NotFound;