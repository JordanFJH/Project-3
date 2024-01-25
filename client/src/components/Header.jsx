import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";

function Header(props) {
    return (
        <div className="w-screen bg-green-400 flex flex-row justify-evenly">
            <h4>MPT</h4>
            <UserInfo />
        </div>
    );
}

export default Header;