import { useState } from "react";

export default function App() {
  const [members, setMembers] = useState([
    { id: 1, name: "Ayah", parent: null },
    { id: 2, name: "Ibu", parent: 1 },
    { id: 3, name: "Anak 1", parent: 2 },
    { id: 4, name: "Anak 2", parent: 2 },
  ]);

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");

  const addMember = () => {
    if (!name || !parentId) return;

    setMembers([
      ...members,
      {
        id: Date.now(),
        name,
        parent: Number(parentId),
      },
    ]);

    setName("");
  };

  const renderTree = (parent) => {
    return members
      .filter((m) => m.parent === parent)
      .map((m) => (
        <div key={m.id} style={styles.node}>
          <div style={styles.box}>👤 {m.name}</div>
          <div style={styles.children}>
            {renderTree(m.id)}
          </div>
        </div>
      ));
  };

  return (
    <div style={styles.container}>
      <h1>Silsilah Keluarga</h1>

      {/* FORM TAMBAH */}
      <div style={styles.form}>
        <input
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
        >
          <option value="">Pilih Orang Tua</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <button onClick={addMember}>Tambah</button>
      </div>

      {/* TREE */}
      <div style={styles.tree}>
        {renderTree(null)}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  form: {
    marginBottom: "20px",
  },
  tree: {
    display: "flex",
    justifyContent: "center",
  },
  node: {
    margin: "10px",
    textAlign: "center",
  },
  box: {
    padding: "10px",
    background: "#4f46e5",
    color: "white",
    borderRadius: "8px",
  },
  children: {
    marginTop: "10px",
    paddingLeft: "20px",
    borderLeft: "2px solid #ccc",
  },
};
