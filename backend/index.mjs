import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.mjs'
import userModel from './Models/userModel.mjs';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import postModel from './Models/postModel.mjs';
dotenv.config();
let PORT = process.env.PORT || 3000;
let app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.post('/create',async(req,res)=>{
  let {name,email,password} = req.body;
  let user = await userModel.findOne({email});
  if(user) return res.status(400).json({message : "User already created"}) ;
  let hashedPassword = await bcrypt.hash(password,10);
  let data = await userModel({
    name,
    email,
    password : hashedPassword
  })
  await data.save();
  let token = jwt.sign({email,name,userId:data._id},process.env.SECRET_KEY);
  res.json(token);
})
app.post('/login',async(req,res)=>{
  let {email,password} = req.body;
  let user = await userModel.findOne({email});
  if(!user) return res.json({message : "Don't have account"})
  let hashedPassword = bcrypt.compare(password,user.password);
  if(hashedPassword){
    let token = jwt.sign({email,name:user.name,userId:user._id},process.env.SECRET_KEY);
    res.json(token);
  }
  else res.send({message : 'Something went wrong'});
})
app.get('/profile',verifyToken,async(req,res)=>{
  let post = await postModel.find();
  res.send({post});
});
app.get('/userProfile',verifyToken,async(req,res)=>{
  let post = await userModel.findOne({email:req.user.email}).populate('posts');
  res.send(post);
});
app.post('/userPost',verifyToken,async(req,res)=>{
  let user = await userModel.findOne({email:req.user.email});
  console.log(user._id);
  let {content} = req.body;
  let post = await postModel({
    user : user._id,
    content
  })
  await post.save();
  user.posts.push(post._id);
  await user.save();
  res.send({user,post});
});
app.get("/likes/:id",verifyToken,async(req,res)=>{
  let post = await postModel.findById({_id:req.params.id}).populate('user');
  if(post.likes.indexOf(req.user.userId) === -1)
  post.likes.push(req.user.userId);
  else 
  post.likes.splice(post.likes.indexOf(req.user.userId),1);        
  await post.save();
  res.json(post);
})
function verifyToken(req, res, next) {
  // Get token from Authorization header
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  
  if (!token) {
      return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token using the secret key
  jwt.verify(token,process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
          return res.status(401).json({ message: 'Invalid token' });
      }
      // If the token is valid, save the decoded user information in the request object
      req.user = decoded;
      next();
  });
};
app.get("/ping",(req,res)=>{
  res.send("pong")
})

app.listen(PORT,()=>{
  console.log(`http://localhost:${PORT}`);
})