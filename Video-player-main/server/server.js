const express=require('express');
const app =express();
const dotenv = require('dotenv');
dotenv.config();
const mongoConnect = require('./db/connect');
const videoroute = require('./routes/videoroute');

app.get('/test',(req,res)=>{
    res.status(200).send("test success");
});
app.use(express.static('../client'));

mongoConnect();

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

app.use(express.json({ limit: '5000mb' })); // You can adjust the limit as needed
app.use(express.urlencoded({ extended: true, limit: '5000mb' }));


app.use(videoroute);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});