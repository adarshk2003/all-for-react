import React from 'react';
import './footer.css'

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-4">
            <h4>CLYRO</h4>
            <ul>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h4>Shop</h4>
            <ul>
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Best Sellers</a></li>
              <li><a href="#">Sale</a></li>
              <li><a href="#">Gift Cards</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h4>Categories</h4>
            <ul>
              <li><a href="#">Men</a></li>
              <li><a href="#">Women</a></li>
              <li><a href="#">Kids</a></li>
              <li><a href="#">Clyro MAX</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <div className="row align-items-center mt-4">
          <div className="col-md-6">
            <div className="brand">CLYRO</div>
          </div>
          <div className="col-md-6">
            <form className="subscribe-form">
              <div className="input-group">
                <input type="email" placeholder="Your Email" required />
                <button type="submit">OK</button>
              </div>
            </form>
          </div>
        </div>
        <div className="row align-items-center mt-4">
          <div className="col-md-6">  
            <p>&copy; 2024 clyro. All Rights Reserved.</p>
          </div>
          <div className="col-md-6 footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
