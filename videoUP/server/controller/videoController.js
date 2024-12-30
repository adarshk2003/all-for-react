const video = require('../db/models/video')
const { success_function, error_function } = require('../utils/handle-files');
const fileUpload = require('../utils/file_uploads').fileUpload;

exports.createVideo = async function (req, res) {
    try {
        let body = req.body;
        let title = req.body.title;
        let videofile = req.body.videofile;


        if (videofile) {
            let video_path = await fileUpload(videofile, "videos");
            console.log(video_path);
            body.videofile = video_path;
        }
        let new_video = await video.create(body);
        if (new_video) {
            response = res.status(200).send("uploaded successfully");
            return;
        }
        else {
            response = res.status(400).send("upload failed");
            return;
        }
    }

    catch (error) {
        console.log("error : ", error);
        res.status(400).send(error.message ? error.message : "Something went wrong");
        return;
    }

}