import fs from 'fs'

export default class CartManager {
    constructor(){
        this.path = "./cart.json";
    }

    createCart = async (newCart) => {//listo
        try {
            const carts = await this.getCarts();
            console.log(carts)
            if (!newCart.products) {
                throw new Error('carrito incompleto')
            }
            if(carts.length == 0){
                newCart.id = 1;
            }else{
                newCart.id = carts[carts.length-1].id+1
            }
            carts.push(newCart)
            await fs.promises.writeFile(this.path,JSON.stringify(carts,null,'\t')); 
            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    getCarts = async() => {//listo
        try{
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path,'utf-8');
                const carts = JSON.parse(data);
                return carts;
            }else{
                return [];
            }
        }catch(error){
             console.log(error)
        }
     }

    getProductByCartId = async (cid) => {//listo
        try {
            const data = await fs.promises.readFile(this.path,'utf-8');
            const carts = JSON.parse(data);
            const myCart = carts.find(c => c.id == cid);
            if (!myCart) return console.log("Error, carrito no encontrado");
            return myCart
        } catch (err) {
            console.log(err)
        }
    }

    addProductToCart = async (cid, pid, quantity = 1) => {//listo
        try{
            const data = await fs.promises.readFile(this.path,'utf-8');
            const carts = JSON.parse(data);
            
            const cartIndex = carts.findIndex(c => c.id == cid)
            if (cartIndex < 0) {
                console.info(`no hay un carrito con este id: ${cid}`)
                return null
            }
    
            const selectedCart = carts[cartIndex];
    
            const productIndex = carts[cartIndex].products.findIndex(p => p.pid == pid)
    
            if (productIndex >= 0) {
                const quantityUltima = carts[cartIndex].products[productIndex].quantity;
                const obj = {}
                obj.quantity = quantityUltima+1;
                obj.pid = pid;
                carts[cartIndex].products[productIndex].quantity = obj.quantity;
                carts[cartIndex].products.filter(p => p != obj);
                carts[cartIndex].products[productIndex].quantity
            } else {
                const cartProduct = { quantity, pid }
                selectedCart.products.push(cartProduct);
            }
    
            await fs.promises.writeFile(this.path,JSON.stringify(carts,null,'\t'));
    
            return carts[cartIndex];
        }catch(error){
            console.log(error);
        }
    }
}

