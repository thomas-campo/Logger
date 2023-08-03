import  express from "express";
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import config from './config.js';

import ProductManager from "./dao/mongo/manager/ProductManagerMongo.js";

// import viewsRouter from "./routes/views.router.js"
import viewsRouterMongo from "./routes/views.router.js";
// import productsRouter from "./routes/products.router.js";
import productsRouterMongo from "./routes/products.router.js"
// import cartRouter from "./routes/cart.router.js"
import cartRouterMongo from "./routes/cart.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import initializePassport from "./config/passport.config.js";

import __dirname from './utils.js';
import attachLogger from "./middlewares/logger.js";

const app = express();
const PORT = config.app.PORT
const server = app.listen(PORT,()=>console.log(`escuchando en el puerto ${PORT}`));
const io = new Server(server);
const connection =  mongoose.connect(config.mongo.URL);

const productManager = new ProductManager();

app.use(attachLogger);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`))

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(session({
    store: new MongoStore({
        mongoUrl:config.mongo.URL,
        ttl:50000
    }),
    secret:"CoderS3cr3t",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
initializePassport();

app.use('/',viewsRouterMongo);
app.use('/api/products',productsRouterMongo);
app.use('/api/carts',cartRouterMongo);
app.use('/api/sessions',sessionsRouter);
app.use('/loggerTest',(req,res)=>{
    try {
        req.logger.debug('debug')
        req.logger.info('info')
        req.logger.http('http')
        req.logger.warning('warning')
        req.logger.error('error')
        req.logger.fatal('fatal')
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send({error:"error en el loggerTest"})
    }
})

io.on('connection',async socket=>{
    const arrayProducts =  await productManager.getProducts();
    io.emit('products',arrayProducts);
    socket.on("product",data=>{
    })
})