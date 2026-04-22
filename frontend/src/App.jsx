import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);

  const addMember = () => {
    if (!name) return;
    setMembers([...members, name]);
    setName("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Silsilah Keluarga</h1>

      <div style={styles.card}>
        <input
          type="text"
          placeholder="Masukkan nama..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <button onClick={addMember} style={styles.button}>
          Tambah
        </button>
      </div>

      <div style={styles.list}>
        {members.map((m, i) => (
          <div key={i} style={styles.item}>
            👤 {m}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  card: {
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "200px",
    marginRight: "10px",
  },
  button: {
    padding: "10px 15px",
    cursor: "pointer",
  },
  list: {
    marginTop: "20px",
  },
  item: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
};
