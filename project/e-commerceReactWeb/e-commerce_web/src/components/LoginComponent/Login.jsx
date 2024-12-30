import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import './Login_sin.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:7000/login', { email, password });
            console.log(response.data);
            const { token, _id, user_type } = response.data.data;

            if (!response.data) {
                toast.error('Login failed');
            } else {
                localStorage.setItem('authToken', token);
                localStorage.setItem('user', JSON.stringify({ _id, user_type }));
                console.log(localStorage);

                toast.success("Login Successful");
                console.log("login successful");

                switch (user_type) {
                    case '673acf45dd0578b3e378e829':
                        navigate('/home');
                        break;
                    case '673acf2bdd0578b3e378e828':
                        navigate('/admin-home');
                        break;
                    case '673ad1d2dd0578b3e378e82a':
                        navigate('/seller-home');
                        break;
                    default:
                        navigate('/home'); // home page
                        break;
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
            toast.error('Login Failed');
        }
    };

    return (
        <>
            <div className="AllBody">
                <div className="container343" id="container343">
                    <div className="form-container sign-in-container">
                        <form onSubmit={handleLogin}>
                            <h1>Log in</h1>
                            <input
                                type="email"
                                placeholder="Email"
                                className="LOGIN123"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="LOGIN123"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <Link to="/Forget" id="Forgot">Forgot your password?</Link>
                            <p className="signUP">
                                Don't have an account?
                                <Link to="/signup" id="signUp"> Sign up</Link>
                            </p>
                            <button type="submit">Log In</button>
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
        </>
    );
}

export default Login;
