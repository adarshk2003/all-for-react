import "./Signup.css";
import { Link } from "react-router-dom";
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Reset any previous error

    try {
      // Await the response from fetch
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Parse the JSON response
      const data = await response.json();

      if (!response.ok) {
        alert("Login failed: " + (data.message || 'Please try again'));
        
      } localStorage.setItem('token', data.token);
        alert("Login success");
    } catch (err) {
      // Catch and display any errors during the fetch
      console.error('Error:', err);
      setError(err.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}  {/* Display error if exists */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="register-button">Sign In</button>
          <br />
          <Link to="/Signup" className="LoginText">New User?</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
