const express = require('express');
const router = express.Router();
const videoController = require('../controller/videoController')
const mongoose = require('mongoose');


router.post('/uploads', videoController.createVideo);
// router.get('/videos', videoRouts.getAllVideos);
// router.get('video/:id', videoRouts.getVideo);


module.exports = router;
