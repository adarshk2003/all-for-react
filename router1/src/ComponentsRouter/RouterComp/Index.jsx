// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Cart from "./cart";
import Shop from "./Shop";
import About from "./About";
import './Index.css'
import Dashboard from "../nestedRouter/Dashbord";


function Index() {
    return (
        <>
            <Router>
                <nav>
                    <ul>
                        <li><Link to={'/Cart'} style={{textDecoration:"none" ,color:"red"}} >Carts</Link></li>
                        <li><Link to={'/Shop'} style={{ textDecoration: "none", color: "red"}} >Shops</Link></li>
                        <li><Link to={'/About'} style={{ textDecoration: "none", color: "red" }} >About</Link></li>
                        <li><Link to={'/Dashboard'} style={{ textDecoration: "none", color: "red" }} >Dashboard</Link></li>
                        
                    </ul>
                </nav>
                <section>
                    <Routes>
                        <Route path={"/About/"} exact element={<About />} />
                        <Route path={"/Shop"} exact element={<Shop />} />
                        <Route path={"/Cart"} exact element={<Cart />} />
                        <Route path={"/Dashboard/*"} exact element={<Dashboard />} />
                        
                        
                    </Routes>
                </section>
            </Router>
        </>
    )
}

export default Index;
