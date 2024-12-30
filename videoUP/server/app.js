const express = require('express')
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoConnect = require('./db/connect');
const videoRouts = require('./router/videoRouts');


app.get('/test', (res, req) => {
    res.status(200).send("test successful");

});



//files
app.use(express.static('../client'));


//db

mongoConnect();

app.use(express.json({ limit: "5000mb " }))
app.use(express.urlencoded({extends:true,limit:'5000mb'}))


app.use(videoRouts);

app.listen(process.env.PORT, () => {
    console.log(`server running at https://localhost:${process.env.PORT}`);
})