import mongoose from "mongoose";

let postSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'post'
  },
  content : {
    type : String,
    required : true,
  },
},{timestamps:true})
let postModel = mongoose.model('post',postSchema);
export default postModel;