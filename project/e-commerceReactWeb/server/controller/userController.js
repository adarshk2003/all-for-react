const users = require('../db/models/user');
const { success_function, error_function } = require('../utils/response-handler');
const user_types = require('../db/models/user_type');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.createUser = async function (req, res) {
    try {
        const { name, email, password, isSeller } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send(error_function({ statusCode: 400, message: "Name, email, and password are required" }));
        }

        const trimmedEmail = email.trim().toLowerCase();

        const userExists = await users.countDocuments({ email: trimmedEmail });

        if (userExists > 0) {
            return res.status(400).send(error_function({ statusCode: 400, message: "User already exists" }));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user_type = isSeller ? '673ad1d2dd0578b3e378e82a' : '673acf45dd0578b3e378e829';

        const newUser = await users.create({
            name,
            email: trimmedEmail,
            password: hashedPassword,
            user_type,
            isSeller
        });

        if (newUser) {
            const token = jwt.sign({ user_id: newUser._id }, process.env.PRIVATE_KEY, { expiresIn: "10d" });
            return res.status(201).send(success_function({
                statusCode: 201,
                data: {
                    token,
                    _id: newUser._id,
                    user_type: newUser.user_type
                },
                message: "User created successfully"
            }));
        } else {
            return res.status(400).send(error_function({
                statusCode: 400,
                message: "User creation failed"
            }));
        }
    } catch (error) {
        console.error("Error: ", error);
        return res.status(400).send(error_function({
            statusCode: 400,
            message: error.message || "Something went wrong"
        }));
    }
};


exports.getAllUsers = async function (req, res) {
    try {
        const { page = 1, limit = 10, sort = 'name', order = 'asc', type, activity, domain } = req.query;

        let query = {};
        if (type) {
            query.user_type = type;
        }
        if (activity) {
            query.status = activity;
        }

        const usersData = await users.find(query)
            .select('name email user_type createdAt status') // Select specific fields
            .sort({ [sort]: order === 'asc' ? 1 : -1 }) // Sort by specified field and order
            .skip((page - 1) * limit) // Pagination: skip the specified number of documents
            .limit(Number(limit)); // Limit the number of results

        const totalUsers = await users.countDocuments(query); // Get total count for pagination

        return res.status(200).send(success_function({
            statusCode: 200,
            data: {
                users: usersData,
                totalUsers,
                totalPages: Math.ceil(totalUsers / limit),
                currentPage: Number(page),
            },
            message: "Users fetched successfully"
        }));
    } catch (error) {
        console.error("Error fetching users: ", error);
        return res.status(400).send(error_function({
            statusCode: 400,
            message: error.message ? error.message : "Something went wrong"
        }));
    }
}
