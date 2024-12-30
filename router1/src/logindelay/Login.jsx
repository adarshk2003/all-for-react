import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Set loading state to true to show a loading spinner, etc.
        setLoading(true);

        // Simulate a delay using setTimeout (e.g., 2 seconds)
        setTimeout(() => {
            // Replace this with your real login logic (API call, etc.)
            if (email === "emma@gmail.com" && password === "emma@123") {
                // Simulate successful login, do something (e.g., save token)
                console.log("Login successful");
                setLoading(false);
                // Redirect or update state to indicate logged in
            } else {
                // Simulate a failed login attempt
                setError("Invalid credentials. Please try again.");
                setLoading(false);
            }
        }, 2000); // 2000 milliseconds = 2 seconds delay
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={loading}>
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Login;
