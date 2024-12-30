// routes/userRoutes.js
const express = require('express');
const userController= require('../controller/userController');

const router = express.Router();
const accessControl=require('../utils/access_control').accessControl;

function  setAccessControl(access_type){
    return(req,res,next)=>{
        accessControl(access_type,req,res,next);
    }
}

router.post('/users', setAccessControl('*'),userController.createUser);
router.get('/users', setAccessControl('1'),userController.getAllUsers);


module.exports = router;
