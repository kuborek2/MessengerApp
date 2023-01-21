import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleLogin } from "../../store/loginSlice";
import './TopNavigation.css'

const TopNavigation = () => {

    const navigate = useNavigate();

    const login = useSelector(state => state.login)

    const dispatch = useDispatch()

    const LogOut = () => {
        dispatch(toggleLogin(""))
        navigate("/");
    }

    const UserControlButtons = (...props) => {
        return (
            <div className="userControlButtons">
                <button disabled id="userName" className="navButton">
                    Settings
                </button>
                <button id="logOutBtn" className="navButton" onClick={() => LogOut()}>
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
            { login.isUserLoggedIn ? <UserControlButtons/> : "" }
        </div>
    );
}

export default TopNavigation;