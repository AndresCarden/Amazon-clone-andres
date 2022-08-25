
const express = require("express");
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin");

//importar ruta de user
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
//import "package:flutter/screen.dart"

//import "package:express/express.dart"

const PORT = 3000;
const DB ="mongodb+srv://Andrus1990:Oli90-ca@cluster0.drwtmrw.mongodb.net/?retryWrites=true&w=majority";

const app = express();


//crear API
//GET, PUT, POST, DELETE, UPDATE = CRUD

//MIDDLEWARE
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);



//CONEXIONES A BASE DE DATOS EN MONGOOSE
mongoose.connect(DB).then(()=>{
    console.log("conexion exitosa");
}).catch((e)=>{
console.log(e);
});




app.listen(PORT,"0.0.0.0",()=>{
    console.log("connected at port"+PORT)
    });

/*app.get("/",(req, res)=>{

res.json({name:"olimpo"});

});
app.get("/hola",(req, res)=>{
res.send("servicion de red");
});
*/

