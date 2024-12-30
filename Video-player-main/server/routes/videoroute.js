const express = require('express');
const router = express.Router();
const videocontroller = require('../controller/videocontroller');
const{set}=require('mongoose')

router.post('/upload',videocontroller.uploadVideo);
router.get('/getvideos',videocontroller.getVideos)
router.get('/getvideo/:id', videocontroller.getSingleVideo);


module.exports = router;