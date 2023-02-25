import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    icon:{
        type:String
    },
    color:{
        type:String
    },
    // image:{
    //     type:String,
    //     default:''
    // }
})
export default mongoose.model('Category',categorySchema);