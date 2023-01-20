import { Link } from "react-router-dom";
import './FrontPage.css'
import { useSelector } from "react-redux";
import Footer from "../footer/Footer";
import chat_image from "../../resources/chat_image.png"

const FrontPage = () => {

    const login = useSelector(state => state.login)

    const LoggedOutUserButtons = () => {
        return (
            <div className='buttonSpace'>
                <Link to="access/signin">
                <button className="navButton">
                    Sign in
                </button>
                </Link>
                <Link to="access/register">
                    <button className="navButton">
                        Register
                    </button>
                </Link>
            </div>
        );
    }

    const LoggedInUserButton = () => {
        return (
            <div className='buttonSpace'>
                <Link to="access/dashboard">
                    <button className="navButton">
                        Go to Dashboard
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="pageLayout">
            <div className="topElement">
                <div class="background-image">
                    <img src={chat_image} alt=""/>
                </div>
                <article>
                    <h1>Messenger App</h1>
                    { login.isUserLoggedIn ? <LoggedInUserButton/> : <LoggedOutUserButtons/> }
                </article>
            </div>
            <Footer/>
        </div>
    );
  }
  
  export default FrontPage;