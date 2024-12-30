// SignupForm.js
import {Link } from "react-router-dom";
import "./Signup.css";
import { useState } from 'react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[isSeller,setIsSeller]=useState('false');
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  const addUser = async (event) => {
    event.preventDefault();
    console.log("reached here...");

    const nameRegex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^.{6,}$/;

    setErrors({ name: '', email: '', password: '' });

    // Validation
    if (!name && !email && !password) {
      setErrors({
        name: "name is required!",
        email: "email is required!",
        password: "password is required!"
      });
      return;
    }

    if (!name) {
      setErrors((prev) => ({ ...prev, name: "name is required!" }));
      return;
    } else if (!nameRegex.test(name)) {
      setErrors((prev) => ({ ...prev, name: "invalid name!" }));
      return;
    }

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "email is required!" }));
      return;
    } else if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: "invalid email!" }));
      return;
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: "password required!" }));
      return;
    } else if (!passwordRegex.test(password)) {
      setErrors((prev) => ({ ...prev, password: "password must contain 6 characters!" }));
      return;
    }

    const data = { name, email, password,isSeller };
    console.log("data:", data);

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      console.log("response:", response);

      if (response.ok) {
        if(responseData.isSeller){
          alert("user created successfully as seller");
        }
        else{
          alert("user created successfully")
        }
      } else {
        const parsedResponse = await response.text();
        console.log("parsed response:", parsedResponse);
        alert(parsedResponse || "something went wrong");
      }
     

      
    } catch (error) {
      console.error("Error:", error);
      alert("something went wrong");
    }
  };

 
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign up</h2>
        <form onSubmit={addUser}>
          <div className="form-group">
            <input type="text" placeholder="Your Name" required value={name}
          onChange={(e) => setName(e.target.value)}/>
          {errors.name && <div id="name-err" style={{ color: 'red' }}>{errors.name}</div>}
      

          </div>
          <div className="form-group">
            <input type="email" placeholder="Your Email" required value={email}
          onChange={(e) => setEmail(e.target.value)} />

          {errors.email && <div id="email-err" style={{ color: 'red' }}>{errors.email}</div>}

          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" required value={password}
          onChange={(e) => setPassword(e.target.value)}/>
          {errors.password && <div id="pass-err" style={{ color: 'red' }}>{errors.password}</div>}
          </div>
          <div className="form-group checkbox-group">
            <input type="checkbox" id="isSeller" checked={isSeller} onChange={()=>{setIsSeller(!isSeller)}} />
            <label htmlFor="isSeller"style={{color: 'wheat'}}>Seller?</label>
          </div>
          <button type="submit" className="register-button">Register</button><br />
          
            <Link to="/Login" className="LoginText"> Already user?</Link>
        </form>
      </div>
    </div>
  );
}



