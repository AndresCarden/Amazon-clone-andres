const mongoose = require("mongoose");
const { productSchema } = require("./product");


//CREAR EL MODELO DE LA BASE DE DATO
const userSchema = mongoose.Schema({

    name:{
        require:true,
        type:String,
        trim:true,
    }, 
    email:{
        require:true,
        type:String,
        trim:true,
        validate:{
            validator:(value)=>{
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message:"Ingrese un correo valido",
        }
    },

    password:{
        require:true,
        type:String,
        trim:true,
    
    },

    address:{
        type:String,
        default:"",
    },

    type:{
        type:String,
        default:"user",
    },
    cart:[
        {
            product:productSchema,
            cantidad:{
                type:Number,
                required:true
            }
        }
    ]

    
});

const User =mongoose.model("User",userSchema);
module.exports = User;