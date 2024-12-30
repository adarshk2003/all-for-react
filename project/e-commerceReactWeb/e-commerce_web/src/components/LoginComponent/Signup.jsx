import { useState } from "react";
import { Link } from "react-router-dom";
import './Login_sin.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const addUser = async (event) => {
        event.preventDefault();
        console.log("REACHED HERE......:)");

        const nameRegex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^.{6,}$/;

        setErrors({ name: '', email: '', password: '' });

        // Basic validation
        if (!name && !email && !password) {
            setErrors({
                name: "Name is required!",
                email: "Email is required!",
                password: "Password is required!"
            });
            return;
        }

        if (!name) {
            setErrors((prev) => ({ ...prev, name: "Name is required!" }));
            return;
        } else if (!nameRegex.test(name)) {
            setErrors((prev) => ({ ...prev, name: "Invalid name!" }));
            return;
        }

        if (!email) {
            setErrors((prev) => ({ ...prev, email: "Email is required!" }));
            return;
        } else if (!emailRegex.test(email)) {
            setErrors((prev) => ({ ...prev, email: "Invalid email!" }));
            return;
        }

        if (!password) {
            setErrors((prev) => ({ ...prev, password: "Password required!" }));
            return;
        } else if (!passwordRegex.test(password)) {
            setErrors((prev) => ({ ...prev, password: "Password must contain 6 characters!" }));
            return;
        }

        const data = { name, email, password, isSeller };
        console.log(data);

        // Fetching
        try {
            const response = await axios.post("http://localhost:7000/users", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            if (response.status === 201) {
                toast.success(response.data.isSeller ? "Account created as seller successfully!" : "Account created successfully!");
                navigate('/login');
            } else {
                toast.error(response.data.message || "Something went wrong!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert(error.response?.data?.message || "Something went wrong");
        }
        
    };

    return (
        <div className="AllBody">
            <div className="container343" id="container343">
                <div className="form-container sign-in-container">
                    <form onSubmit={addUser}>
                        <h1>Create Account</h1>

                        <input
                            type="text"
                            placeholder="Name"
                            className="LOGIN123"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <div id="name-err" style={{ color: 'red' }}>{errors.name}</div>}

                        <input
                            type="email"
                            placeholder="Email"
                            className="LOGIN123"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div id="email-err" style={{ color: 'red' }}>{errors.email}</div>}

                        <input
                            type="password"
                            placeholder="Password"
                            className="LOGIN123"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div id="pass-err" style={{ color: 'red' }}>{errors.password}</div>}

                        <div>
                            <input
                                type="checkbox"
                                id="seller"
                                checked={isSeller}
                                onChange={() => setIsSeller(!isSeller)}
                            />
                            <label htmlFor="seller">Sign up as seller?</label>
                        </div>

                        <button type="submit">Sign Up</button>
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Welcome Back!</h1>
                            {/* <p>Log in to your account to continue exploring.</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
