const mongoose=require('mongoose');

const videos = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    videofile:{
        type:String,
        required:true
    }

});
module.exports = mongoose.model("videos",videos);