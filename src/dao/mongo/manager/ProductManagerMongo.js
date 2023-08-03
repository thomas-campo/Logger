import productModel from "../models/product.js"

export default class ProductManager{
    categories = async () => {
        try {
            const categories = await productModel.aggregate([
                {
                    $group: {
                        _id: null,
                        categories: { $addToSet: "$category" }
                    }
                }
            ])
            return categories[0].categories
        }
        catch (err) {
            console.log(err);
            return err
        }
    }

    getProductArray=async(filter, options)=>{
        return await productModel.paginate(filter, options);
    }
    
    getProducts=()=>{
        return productModel.find().lean();
    }

    getProductBy=(param)=>{
        return productModel.findOne(param).lean();
    }

    getProductById=(id)=>{
        return productModel.findById(id).lean();
    }

    createProduct=(product)=>{
        return productModel.create(product);
    }

    updateProduct=(id,product)=>{
        return productModel.findByIdAndUpdate(id,{$set:product});
    }

    deleteProduct=(id)=>{
        return productModel.findByIdAndDelete(id);
    }
}