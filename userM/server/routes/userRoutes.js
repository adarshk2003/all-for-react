const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const checkLogin = require("../utils/checkLogin").checkLogin;
const accessControl = require("../utils/access-control").accessControl;


function setaccessControl(access_types){
    return (req,res,next) =>{
        accessControl( access_types, req, res, next);
    }
}


router.post('/users',setaccessControl("1"),userController.createUser);
router.get('/users',setaccessControl("1"), userController.getAllUsers);
router.get('/user/:id',setaccessControl("1,2"), userController.getSingleUser);


module.exports = router;