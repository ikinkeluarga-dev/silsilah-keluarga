import axios from "axios";
import { useState, useEffect } from "react";

const api = axios.create({
  baseURL: "https://silsilah-api.onrender.com/api" // sementara pakai ini dulu
});

export default function App() {
  const [family, setFamily] = useState([]);
  const [name, setName] = useState("");

  const loadFamily = async () => {
    try {
      const res = await api.get("/family");
      setFamily(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addFamily = async () => {
    if (!name) return;
    await api.post("/family", { name });
    setName("");
    loadFamily();
  };

  useEffect(() => {
    loadFamily();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Silsilah Keluarga</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama anggota"
      />
      <button onClick={addFamily}>Tambah</button>

      {family.map((f) => (
        <div key={f._id}>👤 {f.name}</div>
      ))}
    </div>
  );
}
