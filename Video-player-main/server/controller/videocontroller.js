const video =require('../db/model/video')
const { success_function,error_function } = require('../utils/response-handler');
const fileUpload = require('../utils/file-upload').fileUpload;

exports.uploadVideo=async function(req,res) {
    try{
        let body=req.body;
        let title=req.body.title;
        let videofile=req.body.videofile;


        if(videofile){
            let video_path=await fileUpload(videofile,"videos");
            console.log(video_path);
            body.videofile=video_path;
        }
        let new_video=await video.create(body);
        if(new_video){
            response=res.status(200).send("uploaded successfully");
            return;
        }
        else{
            response=res.status(400).send("upload failed");
            return;
        }
    }
    
    catch (error) {
        console.log("error : ", error);
        res.status(400).send(error.message ? error.message : "Something went wrong");
        return;
    }
    
}

//get videos

exports.getVideos=async function (req,res) {
    try{
        let videodata=await video.find();
        console.log(videodata);
        res.status(200).send(videodata);
        return;
    }
    catch(error){
        console.log(error);
        res.status(400).send(error.message ? error.message : error);
    }
}

//single video get

exports.getSingleVideo=async function (req,res) {
    try{
        let id=req.params.id;
        console.log(id);
        let videoData = await video.find({_id:id});
        console.log(videoData);
        res.status(200).send(videoData);
    }
    catch(error){
        console.log(error);
        res.status(400).send(error.message ? error.message : error);
    }
}