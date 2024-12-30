const users = require('../db/models/user');
const control_data = require('./control_data.json');
const jwt = require('jsonwebtoken');
const { success_function, error_function } = require("./response-handler");
const dotenv = require('dotenv');
dotenv.config();

exports.accessControl = async function (access_type, req, res, next) {
    try {
        console.log("access type", access_type);
        /* control set to all users types(*) */
        if (access_type === "*") {
            return next();
        }
        //auth header
        const authHead = req.headers['authorization'];
        console.log("auth head", authHead);

        //token not found
        if (!authHead) {
            let response = error_function({
                statusCode: 400,
                message: "please login to continue"
            });
            return res.status(response.statusCode).send(response);
        }

        //split token
        const token = authHead.split(" ")[1];
        console.log("token ::", token);

        //missing or invalid token
        jwt.verify(token, process.env.PRIVATE_KEY, async function (error, decode) {
            if (error) {
                let response = error_function({
                    statusCode: 400,
                    message: "Authentication failed"
                });
                return res.status(response.statusCode).send(response);
            }
            console.log("decode", decode);

            //find user from decoded user id
            let user = await users.findOne({ _id: decode.user_id }).populate("user_type");
            console.log("user id::", user);

            if (!user) {
                let response = error_function({
                    statusCode: 404,
                    message: "User not found"
                });
                return res.status(response.statusCode).send(response);
            }

            if (!user.user_type) {
                let response = error_function({
                    statusCode: 400,
                    message: "User type not defined"
                });
                return res.status(response.statusCode).send(response);
            }

            let user_type = user.user_type.user_type;
            console.log("user_type::", user_type);

            // Convert access_type to string if it's an array
            let allowed;
            if (Array.isArray(access_type)) {
                allowed = access_type.map((obj) => control_data[obj.toString()]);
            } else if (typeof access_type === "string") {
                allowed = access_type.split(",").map((obj) => control_data[obj]);
            } else {
                console.error("access_type is not a string or array:", access_type);
                allowed = [];
            }
            console.log("allowed::", allowed);

            if (allowed && allowed.includes(user_type)) {
                return next();
            } else {
                let response = error_function({
                    statusCode: 403,
                    message: "Not allowed to access the route"
                });
                return res.status(response.statusCode).send(response);
            }
        });

    } catch (error) {
        console.log("error :", error);
        let response = error_function({
            statusCode: 400,
            message: error.message ? error.message : "Something went wrong"
        });
        res.status(response.statusCode).send(response);
    }
};
