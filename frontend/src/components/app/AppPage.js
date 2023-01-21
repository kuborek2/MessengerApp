import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import TopNavigation from "../top_navigation/TopNavigation";

// const divStyle = {
//     width: '100%',
//     overflow: 'hidden'
// };

const AppPage = () => {
    return (
        <div>
            <TopNavigation/>
            <Outlet />
            <Footer/>
        </div>
    );
}

export default AppPage;