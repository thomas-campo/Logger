import { createHash, validatePassword } from "../utils.js";
import userModel from "../dao/mongo/models/user.js";

const register = async(req,res)=>{
    res.send({status:"success",message:"registrado"});
}

const registerFailed = (req,res)=>{
    console.log(req.session.messages);
    res.status(400).send({status:"error",error:req.session.messages})
}

const login = async(req,res)=>{
    req.session.user = {
        name: req.user.name,
        role: req.user.role,
        id: req.user.id,
        email: req.user.email
    }
    
    res.status(200).send({ status: 'success'});
}

const loginFailed = (req,res)=>{
    console.log(req.session.messages);
    if(req.session.messages.length>4) return res.status(400).send({message:"se bloquearon los intentos de login"})
    res.status(400).send({status:"error",error:req.session.messages});
}

const logout = async(req,res)=>{
    req.session.destroy(err =>{
        if(!err){
            res.redirect('/login');
        }
        else res.send({status:'error al cerrar sesion',body: err})
    });
}

const github = (req,res)=>{}

const githubCallback = (req,res)=>{
    const user = req.user;
    req.session.user={
        id:user.id,
        name:user.first_name,
        rol:user.rol,
        email:user.email
    }
    res.status(200).redirect('/products');
}

const restorePassword = async(req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user) return res.status(400).send({status:"error",error:"Usuario no encontrado"});
    const samePassword = await validatePassword(password,user.password);
    if(samePassword) return res.status(400).send({status:"error",error:"Escribiste la misma contraseña"});
    const newHasedPassword = await createHash(password);
    await userModel.updateOne({email},{$set:{password:newHasedPassword}});
    res.status(200).send({ status: 'success'});
}

export default {
    register,
    registerFailed,
    login,
    loginFailed,
    logout,
    github,
    githubCallback,
    restorePassword
}