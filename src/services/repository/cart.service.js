export default class CartService {
    constructor(dao){
        this.dao = dao;
    }
    createCart = (cart) => {
        return this.dao.createCart(cart)
    }
    getCarts = () => {
        return this.dao.getCarts();
    }
    getCartById = (cid) => {
        return this.dao.getCartById(cid);
    }
    getCartsByUser = (uid) => {
        return this.dao.getCartsByUser(uid)
    }
    addProductInCart = (cid, productBody) => {
        return this.dao.addProductInCart(cid, productBody)
    }
    deleteProductInCart = (cid, products) => {
        return this.dao.deleteProductToCart(cid, products)
    }
    updateProductsToCart = (cid, products) => {
        return this.dao.updateProductsToCart(cid, products)
    }
    updateOneProduct = (cid, products) => {
        return this.dao.updateOneProduct(cid, products)
    }
}