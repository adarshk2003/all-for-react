const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

async function mongoConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
      console.log(error);  
    }
}



module.exports = mongoConnect;