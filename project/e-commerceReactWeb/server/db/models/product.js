const mongoose = require('mongoose');

const products = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0, 
    },
    stock: {
        type: Number,
        required: true,
        min: 0, 
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5,
    },
    image: {
        type: String,
        required: false,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }
}, { timestamps: true }); 

module.exports = mongoose.model("Product", products);
