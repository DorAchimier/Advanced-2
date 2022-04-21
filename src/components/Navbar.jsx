import { Link } from 'react-router-dom';

const Navbar = ( {pageName, pageRef, extraText} ) => {
    return ( 
        <nav className="navbar">
            <h1>AmnonChat</h1>
            <div className="links">
                {/* <Link to="/">Home</Link> */}
                <a>{extraText}</a>
                <Link to={pageRef} style={{
                    color: "white",
                    backgroundColor: "#f1356d",
                    borderRadius: "8px"
                }}>{pageName}</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;