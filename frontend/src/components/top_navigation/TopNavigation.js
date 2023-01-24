import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MessageStatus from "../../enum/MessageStatus";
import { toggleLogin } from "../../store/loginSlice";
import UserRequests from "../reusable/UserRequests";
import './TopNavigation.css'

const TopNavigation = () => {

    const navigate = useNavigate();

    const login = useSelector(state => state.login)
    const chat = useSelector(state => state.chat)

    const dispatch = useDispatch()

    const LogOut = () => {
        UserRequests.RequestUserStatusChange(login.userName, "offline")
        var chatMessage = {
            senderName: login.userName,
            status: MessageStatus.LEAVE
          };
        if( chat.stompClient )
            chat.stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
        dispatch(toggleLogin(""))
        navigate("/");
    }

    //Handle status change
    const requestUserStatusChangeSettled = (response) => {
    }
  
    const requestUserStatusChangeRejected = (response) => {
        console.log("use status change failed: "+response.status)
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