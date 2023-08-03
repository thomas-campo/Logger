import { Router } from "express";
import passport from "passport";
import UserManager from "../dao/mongo/manager/UserManagerMongo.js";
import sessionController from "../controllers/session.controller.js";

const router = Router();

router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerFail',failureMessage:true}),sessionController.register);
router.get('/registerFail',sessionController.registerFailed);

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail', failureMessage:true}),sessionController.login);
router.get('/loginFail',sessionController.loginFailed);

router.get('/logout',sessionController.logout);

router.get('/github',passport.authenticate('github'),sessionController.github);

router.get('/githubcallback',passport.authenticate('github'),sessionController.githubCallback);

router.post('/restorePassword',sessionController.restorePassword);

export default router;