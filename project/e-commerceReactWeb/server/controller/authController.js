const { success_function, error_function } = require('../utils/response-handler');
const users = require('../db/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send(error_function({ statusCode: 400, message: "Email and password are required" }));
        }

        const trimmedEmail = email.trim().toLowerCase();

        const user = await users.findOne({ email: trimmedEmail });

        if (!user) {
            return res.status(404).send(error_function({ statusCode: 404, message: "User not found" }));
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).send(error_function({ statusCode: 400, message: "Invalid password" }));
        }

        const token = jwt.sign({ user_id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "10d" });

        res.status(200).send(success_function({
            statusCode: 200,
            data: {
                token,
                _id: user._id,
                user_type: user.user_type,
            },
            message: "Login successful"
        }));

    } catch (error) {
        console.error("Error: ", error);
        res.status(400).send(error_function({
            statusCode: 400,
            message: error.message || "Something went wrong"
        }));
    }
};




// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   const user = await users.findOne({ email });

//   if (!user) {
//     return res.status(404).send('User not found');
//   }

//   const resetToken = crypto.randomBytes(32).toString('hex');
//   user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//   user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

//   await user.save();

//   const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${user._id}/${resetToken}`;

//   const message = await resetPasswordTemplate(user.name, resetUrl);

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: 'Password Reset',
//       message, 
//     });
//     res.status(200).send('Reset link sent to your email');
//   } catch (error) {
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save();
//     res.status(500).send('Error sending email');
//   }
// };

// exports.resetPassword = async (req, res) => {
//     try {
//         const { id, token } = req.params;
//         const { password } = req.body;

//         const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

//         const user = await User.findOne({
//             _id: id,
//             resetPasswordToken: hashedToken,
//             resetPasswordExpire: { $gt: Date.now() }
//         });

//         if (!user) {
//             return res.status(400).send('Invalid or expired token');
//         }

//         // Check if the new password is the same as the old password
//         const isSamePassword = await bcrypt.compare(password, user.password);
//         if (isSamePassword) {
//             return res.status(400).send('New password must be different from the old password');
            
//         }

//         // Update the user's password
//         user.password = await bcrypt.hash(password, 12);
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;
//         await user.save();

//         res.send('Password successfully reset');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error resetting password');
//     }
// };


