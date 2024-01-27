import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";

function Header(props) {
    return (
        <div className="w-screen bg-green-400 flex flex-row justify-evenly">
            <Link to="/"><h4>Home</h4></Link>
            <h4>Media Progress Tracker</h4>
            <UserInfo user={props.user} setUser={props.setUser}/>
        </div>
    );
}

export default Header;