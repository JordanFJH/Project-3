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
            <div className="flex">
                <h4>{user.username}</h4>
                <h4 onClick={signOutProcess}>Sign Out</h4>
            </div>
        )
    }

    function notSignedIn() {
        return (
            <Link to="/login">
                <h4>{user.username ? "Sign Out" : "Sign in"}</h4>
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