import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
    },
    zipcode:{
        type:String
    }

})

export default mongoose.model('AccountSetting',accountSchema);
