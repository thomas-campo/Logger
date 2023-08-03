import { Router } from 'express'
import cartController from '../controllers/cart.controller.js';

const routerCart = Router();

routerCart.get('/:cid',cartController.getCart)

routerCart.post('/',cartController.createCart)

routerCart.post('/:cid/product/:pid',cartController.addProductInCart)

routerCart.put('/:cid',cartController.putCart)

routerCart.put('/:cid/product/:pid',cartController.putQuantity)

routerCart.delete('/:cid/product/:pid',cartController.deleteProductInCart)

routerCart.delete('/:cid',cartController.deleteCart)

routerCart.post('/:cid/purchase',cartController.purchaseCart)

export default routerCart;