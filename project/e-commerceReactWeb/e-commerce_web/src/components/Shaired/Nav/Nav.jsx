import React from 'react';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faHeart, faBagShopping, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './nav.css';

library.add(faSearch, faHeart, faBagShopping, faUser, faSignOutAlt);

function Nav() {
  return (
    <div className="nav-container">
      {/* Main Navbar */}
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand logo" to="/">CLYRO</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/getallproduct">Shop</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
            </ul>
            <div className="navbar-nav ml-auto nav-icons d-flex align-items-center">
              <div className="search-bar d-none d-md-flex">
                <input type="text" className="form-control" placeholder="Search..." />
                <button className=" btn-outline-secondary btn" type="submit">
                  <FontAwesomeIcon icon="search" />
                </button>
              </div>
              <Link to="/favorites" className="nav-icon ml-3" title="Favorites">
                <FontAwesomeIcon icon="heart" />
              </Link>
              <Link to="/cart" className="nav-icon ml-3 position-relative" title="Bag">
                <FontAwesomeIcon icon="bag-shopping" />
                <span className="position-absolute badge badge-danger" style={{ top: '0', right: '-10px' }}>3</span>
              </Link>
              {/* User Profile with Dropdown */}
              <div className="profile-dropdown dropdown ml-3">
                <img src="/userimage.jpg" alt="User" className="user-logo dropdown-toggle" data-toggle="dropdown" />
                <div className="dropdown-menu dropdown-menu-right">
                  <Link className="dropdown-item" to="/profile"><FontAwesomeIcon icon="user" /> Profile</Link>
                  <Link className="dropdown-item" to="/logout"><FontAwesomeIcon icon="sign-out-alt" /> Logout</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Secondary Navbar */}
      <nav className="secondary-nav navbar navbar-expand-md navbar-light h-25">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarSecondary">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="menDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Men
                </a>
                <div className="dropdown-menu" aria-labelledby="menDropdown">
                  <Link className="dropdown-item" to="/men/shirts">Shirts</Link>
                  <Link className="dropdown-item" to="/men/trousers">Trousers</Link>
                  <Link className="dropdown-item" to="/men/shoes">Shoes</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="womenDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Women
                </a>
                <div className="dropdown-menu" aria-labelledby="womenDropdown">
                  <Link className="dropdown-item" to="/women/dresses">Dresses</Link>
                  <Link className="dropdown-item" to="/women/shoes">Shoes</Link>
                  <Link className="dropdown-item" to="/women/accessories">Accessories</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="kidsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Kids
                </a>
                <div className="dropdown-menu" aria-labelledby="kidsDropdown">
                  <Link className="dropdown-item" to="/kids/clothing">Clothing</Link>
                  <Link className="dropdown-item" to="/kids/shoes">Shoes</Link>
                  <Link className="dropdown-item" to="/kids/toys">Toys</Link>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/clyro-max">Clyro MAX</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
