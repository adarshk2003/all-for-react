// import React, { useState } from 'react';
// import './Login_sin.css';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

// export default function Forget() {
//     const [email, setEmail] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Send email request to backend for forgot password
//             await axios.post('/forgot-password', { email });
//             toast.success('Password reset link sent!');
//         } catch (error) {
//             console.error(error);
//             toast.error('Error sending reset link');
//         }
//     };

//     return (
//         <>
//             <div className="AllBody">
//                 <div className="container343" id="container">
//                     <div className="form-container sign-in-container">
//                         <form onSubmit={handleSubmit}>
//                             <h1>Forgot Your Password?</h1>
//                             <input
//                                 type="email"
//                                 placeholder="Enter email"
//                                 className="ForgotPass"
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                             <button type="submit">Submit</button>
//                         </form>
//                     </div>
//                     <div className="overlay-container">
//                         <div className="overlay">
//                             <div className="overlay-panel overlay-right">
//                                 <h1>Sorry, we will bring you back!</h1>
//                                 {/* <p>Please reset your password to regain access to your account.</p> */}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
