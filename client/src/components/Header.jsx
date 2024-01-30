import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";

function Header(props) {
    return (
        <div className="bg-green-400 flex flex-row justify-evenly m-0 items-center">
            <Link to="/"><h4>Home</h4></Link>
            <h2 className="m-0">Media Progress Tracker</h2>
            <UserInfo user={props.user} setUser={props.setUser}/>
        </div>
    );
}

export default Header;