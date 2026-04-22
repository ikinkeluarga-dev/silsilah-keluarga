import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://ikinkeluarga_db_user:5AHfhrTHe0Afi3p2@silsilah-cluster.m8ccpwm.mongodb.net/silsilah?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const { Schema, model } = mongoose;

// ================= MODEL =================
const Post = model("Post", new Schema({
  text: String,
  likes: { type: Number, default: 0 }
}));

const Family = model("Family", new Schema({
  name: String
}));

const User = model("User", new Schema({
  name: String,
  email: String,
  password: String
}));

// ================= AUTH =================
app.post('/api/auth/login', async (req,res)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user) return res.status(400).send("User not found");
  res.json({token:"123456", user});
});

// ================= POST =================
app.post('/api/post', async (req,res)=>{
  const p = await Post.create({text:req.body.text});
  res.json(p);
});

app.get('/api/post', async (req,res)=>{
  const data = await Post.find().sort({_id:-1});
  res.json(data);
});

app.put('/api/post/like/:id', async (req,res)=>{
  await Post.findByIdAndUpdate(req.params.id, {$inc:{likes:1}});
  res.send("ok");
});

// ================= FAMILY =================
app.get('/api/family', async (req,res)=>{
  const data = await Family.find();
  res.json(data);
});

app.post('/api/family', async (req,res)=>{
  const m = await Family.create({name:req.body.name});
  res.json(m);
});

// ================= START =================
app.listen(5000, ()=> console.log("Server running on 5000"));
