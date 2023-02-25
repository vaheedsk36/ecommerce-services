import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:String,
    countInStock:{
        type:Number,
        required:true
    }
})

export default mongoose.model('Order',orderSchema);