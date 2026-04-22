
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let posts = [];
let members = [];
let users = [{_id:"1", name:"Admin", email:"admin@test.com", password:"123"}];

app.post('/api/auth/login', (req,res)=>{
  const user = users.find(u=>u.email===req.body.email);
  if(!user) return res.status(400).send("User not found");
  res.json({token:"123456", user});
});

app.get('/api/post',(req,res)=> res.json(posts));

app.post('/api/post',(req,res)=>{
  const p = {_id:Date.now().toString(), text:req.body.text, likes:0};
  posts.unshift(p);
  res.json(p);
});

app.put('/api/post/like/:id',(req,res)=>{
  posts = posts.map(p=> p._id===req.params.id ? {...p, likes:p.likes+1}:p);
  res.send("ok");
});

app.get('/api/family',(req,res)=> res.json(members));

app.post('/api/family',(req,res)=>{
  const m = {_id:Date.now().toString(), name:req.body.name};
  members.push(m);
  res.json(m);
});

app.get('/api/users',(req,res)=> res.json(users));

app.post('/api/friends/:id',(req,res)=> res.send("request sent"));

app.listen(5000, ()=> console.log("Server running on 5000"));
