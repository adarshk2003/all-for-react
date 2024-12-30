const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
dotenv.config();
const mongoConnect = require('./db/connect'); 
const userRoutes = require('./routes/userRouts');
const authRoutes = require('./routes/authRoutes');
const produtRoutes=require('./routes/productRout');

app.use(cors({ 
    origin: 'http://localhost:5173'
}));
app.get('/test', (req, res) => {
    res.status(200).send("Test successful");
});

app.use(express.static("../e-commerce_web"));
app.use('/upload', express.static(path.join(__dirname, 'upload')));

mongoConnect();

app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(authRoutes);
app.use(produtRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
