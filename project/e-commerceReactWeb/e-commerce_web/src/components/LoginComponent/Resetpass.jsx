// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './Login_sin.css';

// const ResetPassword = () => {
//     const [password, setPassword] = useState('');
//     const { id, token } = useParams(); // Ensure you capture both id and token from URL parameters

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Making a POST request to the reset-password endpoint with id and token parameters
//             await axios.post(`/reset-password/${id}/${token}`, { password }); 
//             alert('Password reset successful!');
//         } catch (error) {
//             console.error(error);
//             alert('Error resetting password');
//         }
//     };

//     return (
//         <div className="AllBody">
//             <div className="container343" id="container343">
//                 <div className="form-container sign-in-container">
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="password"
//                             placeholder="Enter new password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                         <button type="submit">Reset Password</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ResetPassword;
