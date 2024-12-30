const users = require('../db/models/users');
const {success_function , error_function } = require('../utils/response-handler');
const bcrypt = require('bcrypt');
const fileUpload = require('../utils/file-upload').fileUpload;
const user_types = require ("../db/models/user_types");


exports.createUser = async function (req, res) {
    try {

        let body = req.body;
        console.log("body : ", body);


        let name = req.body.name;
        console.log("name : ", name);

        let email = req.body.email;
        console.log("email : ", email);

        let age  = req.body.age;
        console.log("age : ", age);

        let password = req.body.password;
        console.log("password : ", password);

        body.user_type = "66f420a7384f7819814abf1a";

        let image = req.body.image;
        // console.log("image :",image);

        if(image){
            let img_path = await fileUpload (image,"users");
            console.log("img_path :",img_path);
            body.image = img_path;
        }



        //validations required
        if(!name) {
            response = error_function({
                statusCode : 400,
                message : 'Name is required'
            });
            res.status(response.statusCode).send(response);
            return;
        }

        let count = await users.countDocuments({email});
        console.log("count : ", count);

        if(count > 0){
            res.status(400).send("User already exists");
            return;
        }

        //password hashing

        let salt = bcrypt.genSaltSync(10);
        console.log("salt :",salt);

        let hashed_password = bcrypt.hashSync(password, salt);
        console.log("hashed_password :",hashed_password);

        body.password = hashed_password;
    
        let new_user = await  users.create(body);
    
        if(new_user) {

            response = 
            res.status(200).send("User created successfully");
            return;
        }else {
            res.status(400).send("User creation failed");
            return;
        }
        
    } catch (error) {
        console.log("error : ", error);
        res.status(400).send(error.message ? error.message : "Something went wrong");
        return;
    }
}

exports.getAllUsers = async function(req, res) {
    try {
        let usersData = await users.find().populate({ path: "user_type", select: "-__v" }).select("-__v");
        console.log("usersData : ", usersData);
    
        res.status(200).send(usersData);
        return;
    } catch (error) {
        console.log("error : ", error);
        res.status(400).send(error.message ? error.message : error);
    }
}

exports.getSingleUser = async function(req, res) {
    try {
        let id = req.params.id;
        console.log("id : ", id);
    
        let userData = await users.find({_id : id});
        console.log("userData : ", userData);
    
        res.status(200).send(userData);
        return;
    } catch (error) {
        console.log("error : ", error);
        res.status(400).send(error.message ? error.message : error);
    }
}
