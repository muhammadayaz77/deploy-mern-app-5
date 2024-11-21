import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  name : String,
  email : {
    type : String,
    required : true,
    unique : true,
  },
  password : String,
})
let userModel = mongoose.model('user',userSchema);
export default userModel;