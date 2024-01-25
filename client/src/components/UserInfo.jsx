import { Link, useParams } from "react-router-dom";

function UserInfo(props) {

    const params = useParams()

    return (
        <div>
            <Link to="/login">
                <h4>Signin/UserInfo</h4>
            </Link>
        </div>
    );
}

export default UserInfo;