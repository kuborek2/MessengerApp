import { Link, useNavigate } from "react-router-dom";
import './TopNavigation.css'

const TopNavigation = () => {

    const UserControlButtons = (...props) => {
        return (
            <div className="userControlButtons">
                <button disabled id="userName">
                    { "user" }
                </button>
                <button id="logOutBtn" onClick={() => {}}>
                    Log out
                </button>
            </div>
        );
    }

    return (
        <div className="top-navigation-layout">
            <Link to="/">
                <h2 className="header">
                    MessengerApp
                </h2>
            </Link>
            {/* { login.isUserLoggedIn ? <UserControlButtons/> : "" } */}
        </div>
    );
}

export default TopNavigation;