import { Link, Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import Settings from "./Settings";
import './dashboard.css';


function Dashboard() {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to={'/Dashbord/Profile'} style={{ textDecoration: "none", color: "red" }} >Profile</Link></li>
                    <li><Link to={'/Dashbord/Settings'} style={{ textDecoration: "none", color: "red" }} >settings</Link></li>
                </ul>
            </nav>
            <section>
                <Routes>
                <Route path={'/Profile'} exact element={<Profile />} />
                    <Route path={'/Settings'} exact element={<Settings />} />
                </Routes>
            </section>
        </>
    )
}
export default Dashboard;