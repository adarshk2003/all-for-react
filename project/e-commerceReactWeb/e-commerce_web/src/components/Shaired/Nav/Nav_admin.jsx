import React from "react";
import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./nav.css";

function AdminNav() {
  return (
    <div className="nav-container">
      {/* Main Navbar */}
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand logo" to="/">Admin</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/getalluser">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reports">Reports</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/settings">Settings</Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/notifications" className="nav-link" title="Notifications">
                  <i className="fas fa-bell"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link" title="Profile">
                  <i className="fas fa-user"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link" title="Logout">
                  <i className="fas fa-sign-out-alt"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminNav;
