const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");


//ENVIAR DATOS AL LA BASE DE DATOS DE MONGODB
authRouter.post("/api/signup",async(req, res)=>{
    try{

    const{ name, email, password }=req.body;
    
    //VALIDAMOS QUE EXISTA  EL CORREO EN LA BASE DE DATO EN MONGODB
    const exiteUserEmail = await User.findOne({email});
    if(exiteUserEmail){
        return res.status(400).json({msg:"Existe ese usuario con ese correo"});
    }
    const hashPassword = await bcryptjs.hash(password,8);
    let user = new User({
        email,
        password:hashPassword,
        name,
    });

    user =await user.save();
    res.json(user);
    }catch(e){
    res.status(500).json({error:e.message});
}
});

//LOGIN USER
authRouter.post("/api/signin", async(req, res)=>{

try {
    const { email, password }=req.body;
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({msg:"¡El usuario con este correo electrónico no existe!"});
    }

    //DESCRIPTAMOS LA CONTRASEÑA A FORMATO REGISTRADO
    const isMath = await bcryptjs.compare(password, user.password);
    if(!isMath){
        return res.status(400).json({msg:"Contraseña incorrecta." });
    }
const token =jwt.sign({id:user._id}, "passwordKey");
res.json({token, ...user._doc});
} catch (e) {
    res.status(500).json({error:e.message});
}

});



//OBTENER DATA DEL USUARIO
authRouter.post("/tokenIsValidar", async(req, res)=>{

    try {
        const token = req.header("x-auth-token");
        if(!token)return res.json(false);
        const verified = jwt.verify(token,"passwordKey");
        if(!verified)return res.json(false);
        const user = await User.findById(verified.id);
        if(!user)return res.json(false);
        res.json(true);
        

    } catch (e) {
        res.status(500).json({error:e.message});
    }
    
    });


//get user data
authRouter.get("/", auth, async(req, res)=>{
    const user = await User.findById(req.user);
    res.json({...user._doc, token:req.token});
});

module.exports =authRouter;