// import { useState } from 'react'
import Nav from "./nav"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import Signup from "./signup/signup"
import Login from "./signup/signin";
import Home from "./viewpage";
function App() {

  return (
    <>
    <Nav/>
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />

        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    
    </>
  )
}

export default App
