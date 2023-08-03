import { Router } from 'express';
import productsController from '../controllers/products.controller.js';

const router = Router();

//http://localhost:8080/api/products?limit=5
router.get('/',productsController.getProducts);

router.post('/',productsController.createProduct);

router.get('/:pid',productsController.getProductById);

router.put('/:pid',productsController.updateProductById);

router.delete('/:pid',productsController.deleteProductById);

export default router;