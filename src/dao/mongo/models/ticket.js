import mongoose from 'mongoose';

const collection = 'tickets';

const schema = new mongoose.Schema({
    code:String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    amount:Number,
    purchaser:String

}, { timestamps: { createdAt: 'purchase_time', updatedAt: 'updated_at' } }
);

const ticketModel = mongoose.model(collection,schema);
export default ticketModel;