import mongoose from "mongoose";

let postSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  },
  content : {
    type : String,
    required : true,
  },
  likes : [
    {type:mongoose.Schema.Types.ObjectId,ref:'user'}
  ]
},{timestamps:true})
let postModel = mongoose.model('post',postSchema);
export default postModel;