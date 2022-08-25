const mongoose = require("mongoose");
const ratingSchema = require("./rating");

const productSchema = mongoose.Schema({

name:{
    type:String,
    required:true,
    trim:true,
},
description:{
    type:String,
    required:true,
    trim:true
},
images:[
    {
        type:String,
        required:true
    }
],
cantidad:{
    type:Number,
    require:true,
},
precio:{
    type:Number,
    required:true
},
category:{
    type:String,
    required:true
},


//rating  estrellas de products
rating:[
    ratingSchema
]


});


const Product = mongoose.model("Product", productSchema);
module.exports = {Product, productSchema};