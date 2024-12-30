import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/HomeComp/Home';
import Favorites from './components/favComp/Fav';
// import Cart from './components/cartComp/Cart';
import UserProfile from './components/profileComponent/Profile';
// import Nav from './components/Shaired/Nav/Nav';
import Login from './components/LoginComponent/Login';
import Signup from './components/LoginComponent/Signup';
// import Forget from './components/LoginComponent/Forgotpass';
import SellerHomepage from './components/sellerComponent/SellerHome';
import AdminHome from './components/AdminComponent/HomepageAdmin';
import Getalluser from './components/AdminComponent/GetAllUsers';
import Logout from './components/LoginComponent/Logout';
import AddProductForm from './components/sellerComponent/Addproduct';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import OtherSellersProducts from './components/sellerComponent/OtherSellersProduct';
import MyProducts from './components/sellerComponent/Sellerproduct';

library.add(fas);
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Main Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/profile" element={<UserProfile />} /> 
        <Route path="/seller-home" element={<SellerHomepage />} />  
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/addproduct" element={<AddProductForm />} />
        {/* admin  */}
        <Route path="/getalluser" element={<Getalluser />} />
        {/* seller route */}
        <Route path="/myproducts" element={<MyProducts />} />
        
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;