import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  clientId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  refreshtokens: { type: Object, required: true },
  email: { type: String, required: true }
});

export default mongoose.model("AccountSetting", accountSchema);
