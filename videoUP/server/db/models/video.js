const mongoose = require('mongoose');

const video_file = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required:true,
    } ,
    video: {
        type: String,
        require: true,
    }
});




module.exports = mongoose.model("video", video_file);