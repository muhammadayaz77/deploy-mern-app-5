import mongoose from "mongoose";

let connectDB = async() => {
  try {
    await mongoose.connect('mongodb://localhost:27017/myAuth');
    console.log("mongoDB connected...");
  } catch (error) {
    console.log(error);
  }
}
export default connectDB;