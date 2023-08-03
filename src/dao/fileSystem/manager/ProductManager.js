import fs from 'fs';

export default class ProductManager{
    constructor(){
        this.path = './productos.json';
    }
    
    
    addProduct = async(product) =>{
        try{
            const products = await this.getProducts();
            const exist = products.find( p => p.code === product.code)
            if(exist){
                console.log('el producto ya existe')
                return null;
            }
            if(products.length == 0){
                product.id = 1;
            }else{
                product.id = products[products.length-1].id+1
            }
            products.push(product)
            await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'));
            return product;
        }catch(error){
            console.log(error)
        }
    }

    getProducts = async() => {
       try{
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path,'utf-8');
                const products = JSON.parse(data);
                return products;
            }else{
                return [];
            }
       }catch(error){
            console.log(error)
       }
    }

    getProductById = async(id) => {
        try{
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path,'utf-8');
                const products = JSON.parse(data);
                const obj = products.find( product => product.id == id )
                if(!obj){
                    console.log('no se encontro ningun producto')
                    return null
                }
                console.log(obj)
                return obj;
            }
        }catch(error){
            console.log(error)
        }
    }

    updateProduct = async(idObj,obj) => {
        try{
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path,'utf-8');
                const products = JSON.parse(data);
                const nuevoArray = products.map( product => {
                    if(product.id == idObj){
                       return product = Object.assign(products[idObj-1],obj);
                    }
                    return product
                })
                await fs.promises.writeFile(this.path,JSON.stringify(nuevoArray,null,'\t'));
                return nuevoArray;
            }
        }catch(error){
            console.log(error)
        }
    }

    deleteProduct = async(id) => {
        try{
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path,'utf-8');
                const products = JSON.parse(data);
                console.log(id);
                const productDeleteArray = products.filter(product => product.id != id);
                console.log(`${productDeleteArray}`);
                await fs.promises.writeFile(this.path,JSON.stringify(productDeleteArray,null,'\t'));
            }
        }catch(error){
            console.log(error)
        }
    }
}

export class Product {
    constructor(title, description, price, category, thumbnail, code, stock, status = true){
        if (!title ||
            !description ||
            !price ||
            !category ||
            !thumbnail ||
            !code ||
            !stock
        ) {
            throw new Error('informacion del producto incompleto')
        }

        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category
        this.thumbnail = thumbnail || "sin archivo";
        this.code = code;
        this.stock = stock;
        this.status = status;
    }
}