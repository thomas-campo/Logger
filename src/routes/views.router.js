import { Router } from "express";
import { privacity } from "../middlewares/auth.js";
import viewsController from "../controllers/views.controller.js";

const router = Router();

router.get('/',viewsController.getHome)

router.get('/products',viewsController.getProducts)

router.get('/cart/:cid',viewsController.getCartById);

router.get('/register',privacity('NO_AUTHENTICATED'),viewsController.getRegister)

router.get('/login',privacity('NO_AUTHENTICATED'),viewsController.getLogin)

router.get('/profile',privacity('PRIVATE'),viewsController.getProfile)

router.get('/restorePassword',privacity('NO_AUTHENTICATED'),viewsController.getRestorePassword)

export default router;