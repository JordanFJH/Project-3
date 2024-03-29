import { Link, useNavigate } from "react-router-dom";

function UserInfo({ user, setUser }) {

    const navigate = useNavigate()

    function signOutProcess() {
        localStorage.removeItem("token")
        setUser({})
        navigate("/")
    }

    function signedIn() {
        return (
            <div className="flex justify-end">
                <h4>{user.username}</h4> 
                <button onClick={signOutProcess}>Sign Out</button>
            </div>
        )
    }

    function notSignedIn() {
        return (
            <Link to="/login">
                <h4>Sign In</h4>
            </Link>
        )
    }

    return (
        <div>
            {user.username ? signedIn() : notSignedIn()}
        </div>
    );
}

export default UserInfo;