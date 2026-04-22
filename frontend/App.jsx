
import React, {useState,useEffect} from 'react';
import axios from 'axios';

const api = axios.create({baseURL:"http://localhost:5000/api"});

export default function App(){
  const [posts,setPosts]=useState([]);
  const [text,setText]=useState("");

  const load=async()=>{
    const r=await api.get('/post');
    setPosts(r.data);
  }

  useEffect(()=>{load()},[]);

  const add=async()=>{
    await api.post('/post',{text});
    setText("");
    load();
  }

  return (
    <div style={{padding:20}}>
      <h1>Silsilah App</h1>
      <input value={text} onChange={e=>setText(e.target.value)} />
      <button onClick={add}>Post</button>

      {posts.map(p=>(
        <div key={p._id}>
          {p.text} ❤️ {p.likes}
        </div>
      ))}
    </div>
  );
}
