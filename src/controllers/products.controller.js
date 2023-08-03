import ProductManagerMongo from '../dao/mongo/manager/ProductManagerMongo.js';
const productManager = new ProductManagerMongo();

const getProducts = async (req, res) => {
    try{
      let { limit, page, sort, category } = req.query
      // console.log(req.originalUrl);
  
      const options = {
          page: Number(page) || 1,
          limit: Number(limit) || 10,
          sort: { price: Number(sort) }
      };
  
      if (!(options.sort.price === -1 || options.sort.price === 1)) {
          delete options.sort
      }
  
  
      const links = (products) => {
          let prevLink;
          let nextLink;
          if (req.originalUrl.includes('page')) {
              prevLink = products.hasPrevPage ? req.originalUrl.replace(`page=${products.page}`, `page=${products.prevPage}`) : null;
              nextLink = products.hasNextPage ? req.originalUrl.replace(`page=${products.page}`, `page=${products.nextPage}`) : null;
              return { prevLink, nextLink };
          }
          if (!req.originalUrl.includes('?')) {
              prevLink = products.hasPrevPage ? req.originalUrl.concat(`?page=${products.prevPage}`) : null;
              nextLink = products.hasNextPage ? req.originalUrl.concat(`?page=${products.nextPage}`) : null;
              return { prevLink, nextLink };
          }
          prevLink = products.hasPrevPage ? req.originalUrl.concat(`&page=${products.prevPage}`) : null;
          nextLink = products.hasNextPage ? req.originalUrl.concat(`&page=${products.nextPage}`) : null;
          return { prevLink, nextLink };
  
      }
  
      const categories = await productManager.categories()
  
      const result = categories.some(categ => categ === category)
      if (result) {
        const products = await productManager.getProductArray({ category }, options);
        const { prevLink, nextLink } = links(products);
        const { totalPages, prevPage, page, nextPage, hasNextPage, hasPrevPage, docs } = products
        return res.status(200).send({ status: 'success', payload: docs, totalPages, prevPage, page, nextPage, hasNextPage, hasPrevPage, prevLink, nextLink });
      }
  
      const products = await productManager.getProductArray({}, options);
      console.log(products, 'Product');
      const { totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, docs } = products
      const { prevLink, nextLink } = links(products);
      return res.status(200).send({ status: 'success', payload: docs, totalPages, prevPage, page, nextPage, hasNextPage, hasPrevPage, prevLink, nextLink });
    }catch(error){
      console.log("error en el routerGet de productos");
      res.send({error:"error en el servidor al obtener los productos(router.get(products))"});
    }
}

const createProduct = async (req, res) => {
    try{
      const { title, description, price, category, thumbnail, code, stock } = req.body;
      const products = await productManager.getProducts();
      const productExist = req.body;
      if(!title||!description||!price||!category||!thumbnail||!code) return res.status(400).send({status:"error",error:"Valores incompletos",title,description,price,category,thumbnail,code})
      const exist = products.find( p => p.code === productExist.code)
      if(exist){
        console.log('el producto ya existe')
        return res.send({status:"error",error:"producto ya existente"});
      }
      const product = {
        title,
        description,
        price,
        category,
        thumbnail,
        code,
        stock
      }
      const result = await productManager.createProduct(product);
      const arrayProducts = await productManager.getProducts();
      req.io.emit('products',arrayProducts);
      res.status(201).send({status:"success",payload:result});  
    }catch(error){
      res.status(500).send({error:"error interno del servidor"})
    }
}

const getProductById = async (req, res) => {
    try{
      const { pid } = req.params;
      const product = await productManager.getProductBy({ _id: pid });
      if (!product) return res.status(404).send({ status: 'error', error: 'Company not found' });
      res.send({ product });
    }catch{
      res.status(500).send({error:"error interno del servidor"})
    }
}

const updateProductById = async(req,res)=>{
    try{
      const {pid} = req.params;
      const updateProduct = req.body;
      await productManager.updateProduct(pid,updateProduct);
      const arrayProducts = await productManager.getProducts();
      req.io.emit('products',arrayProducts);
      res.sendStatus(201);
    }catch{
      res.status(500).send({error:"error interno del servidor"})
    }
}

const deleteProductById = async(req,res)=>{
    try{
      const {pid} = req.params;
      await productManager.deleteProduct(pid);
      const arrayProducts = await productManager.getProducts();
      req.io.emit('products',arrayProducts);
      res.send({status:'success', payload:arrayProducts});
    }catch(error){
      res.status(500).send({error:"error interno del servidor"})
    }
}

export default {
    getProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById
}
