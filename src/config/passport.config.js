import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2";
import userModel from "../dao/mongo/models/user.js";
import { createHash, validatePassword } from "../utils.js";
import config from "../config.js"
import dtoUser from "../dto/user.js";

import CartManager from "../dao/mongo/manager/CartManagerMongo.js";
import UserManager from "../dao/mongo/manager/UserManagerMongo.js";

const userManager = new UserManager();
const cartManager = new CartManager();


const localStrategy = local.Strategy;

const initializePassport = ()=>{
    passport.use('register',new localStrategy({passReqToCallback:true, usernameField:'email'},async(req,email,password,done)=>{
        try{
            const {first_name,last_name} = req.body;
            const exist = await userModel.findOne({email});
            if(exist) return done(null,false,{message:'este usuario ya existe'});
            const hashedPassword = await createHash(password);//encriptamos la contraseña
            const user = new dtoUser(
                {
                    first_name,
                    last_name,
                    email,
                    password:hashedPassword
                }
            )   
            const result = await userModel.create(user);
            done(null,result)
        }catch(error){
            done(error);
        }
   }))

    passport.use('login',new localStrategy({ usernameField: 'email' },async (email, password, done) => {
        try{
            if (email === config.admin.EMAIL && password === config.admin.PASSWORD) {
                const user ={
                        id: 0,
                        name: `Admin`,
                        role: 'admin',
                        email: '...',
                    };
                return done(null, user);
            }
            let user;
      
            user = await userModel.findOne({ email });
            if (!user) return done(null, false, { message: 'Email incorrecto' });
      
            const isValidPassword = await validatePassword(password, user.password);
            if (!isValidPassword) return done(null, false, { message: 'Contraseña incorrecta' });

            let existsCart = await cartManager.getCartsByUser(user._id)

            async function handleCart() {
                try{
                    let newUserCart;
                    if (existsCart.length === 0) {
                    existsCart = await cartManager.createCart({ uid: user._id, products: [] });
                    let newCart = await userManager.createCart({ uid: user._id, cid: existsCart._id });
                            
                    newUserCart = newCart.cart[0];
                }
                    return newUserCart;
                }catch(err){
                    console.log(err)
                }
            }
                    
            let cart = existsCart[0] ? existsCart[0]._id : await handleCart();

            user = {
                id: user._id,
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                role: user.role,
                cart
            };
            return done(null, user);
        }catch(error){
            done(error);
        }
    }));

    passport.use('github', new GithubStrategy({
        clientID:"Iv1.25b7b0f06a7dce08",
        clientSecret:"22560c970a930e20cc7415b2c7a24c6d7f081c2f",
        callbackURL:"http://localhost:8080/api/sessions/githubcallback"
    },async(accessToken,refreshToken,profile,done)=>{
        try{
            console.log(profile);
            const {name,email} = profile._json;
            const user = await userModel.findOne({email});
            console.log(user);
            if(!user){
                const newUser = {
                    first_name: name,
                    email,
                    password:''
                }
                const result = await userModel.create(newUser);
                let existsCart = await cartManager.getCartsByUser(result._id)

                if (existsCart.length === 0) {
                    let newCart = await cartManager.createCart({ uid: result._id, products: [] })
                    const addCartUser = await userManager.createCart({ uid: result._id, cid: newCart._id })

                    return done(null, addCartUser);
                }
                done(null,result);
            }
            done(null,user);
        }catch(error){
            done(error)
        }
    }))


    passport.serializeUser(function(user,done){
        return done(null,user.id);
    });
    passport.deserializeUser(async function(id,done){
        const user = await userModel.findOne({_id: id });
        return done(null,user);
    });
}

export default initializePassport;