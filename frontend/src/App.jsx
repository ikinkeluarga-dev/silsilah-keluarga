import axios from "axios";
import { useState, useEffect } from "react";

const api = axios.create({
  baseURL: "http://localhost:5000/api" // nanti kita ganti ke online
});

export default function App() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("login");

  const [family, setFamily] = useState([]);
  const [name, setName] = useState("");

  // ================= LOAD USER =================
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // ================= LOAD FAMILY =================
  useEffect(()=>{
    if(user) loadFamily();
  },[user]);

  const loadFamily = async ()=>{
    const r = await api.get('/family');
    setFamily(r.data);
  };

  const addFamily = async ()=>{
    await api.post('/family', { name });
    setName("");
    loadFamily();
  };

  // ================= AUTH =================
  const login = (email, password) => {
    const savedUser = JSON.parse(localStorage.getItem("account"));
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      localStorage.setItem("user", JSON.stringify(savedUser));
      setUser(savedUser);
    } else {
      alert("Login gagal");
    }
  };

  const register = (name, email, password) => {
    const newUser = { name, email, password };
    localStorage.setItem("account", JSON.stringify(newUser));
    alert("Register berhasil");
    setMode("login");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // ================= UI =================
  if (!user) {
    return mode === "login" ? (
      <Login onLogin={login} onSwitch={() => setMode("register")} />
    ) : (
      <Register onRegister={register} onSwitch={() => setMode("login")} />
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Halo, {user.name}</h1>

      <h2>Keluarga</h2>
      <input value={name} onChange={e=>setName(e.target.value)} />
      <button onClick={addFamily}>Tambah</button>

      {family.map(f=>(
        <div key={f._id}>
          👤 {f.name} ({f.status})
        </div>
      ))}

      <button onClick={logout}>Logout</button>
    </div>
  );
}

// ================= LOGIN =================
function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={styles.box}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => onLogin(email, password)}>Login</button>
      <p onClick={onSwitch} style={styles.link}>Belum punya akun? Register</p>
    </div>
  );
}

// ================= REGISTER =================
function Register({ onRegister, onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={styles.box}>
      <h2>Register</h2>
      <input placeholder="Nama" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => onRegister(name, email, password)}>Daftar</button>
      <p onClick={onSwitch} style={styles.link}>Sudah punya akun? Login</p>
    </div>
  );
}

const styles = {
  box: {
    maxWidth: 300,
    margin: "100px auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  link: {
    color: "blue",
    cursor: "pointer",
  },
};
