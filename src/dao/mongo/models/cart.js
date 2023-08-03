import mongoose from "mongoose";

const collection = "carts";

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    products:{
        type:[
            {
                _id:{
                    type:mongoose.SchemaTypes.ObjectId,
                    ref:'products'
                },
                quantity:{
                    type:Number,
                    default:1
                }
            }
        ],
        default: []
    }
},{timestamps:{createdAt:'created_at',updatedAt:'update_at'}}
);

schema.pre('findOne', function(next){
    this.populate('products._id')
    next()
})

const cartModel = mongoose.model(collection,schema);
export default cartModel;