import { useState } from "react";
import "./App.css";

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
      { id: Date.now(), name, parent: Number(parentId) },
    ]);

    setName("");
  };

  const renderTree = (parent) => {
    const children = members.filter((m) => m.parent === parent);

    if (children.length === 0) return null;

    return (
      <ul>
        {children.map((child) => (
          <li key={child.id}>
            <div className="node">{child.name}</div>
            {renderTree(child.id)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container">
      <h1>Silsilah Keluarga</h1>

      <div className="form">
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

      <div className="tree">{renderTree(null)}</div>
    </div>
  );
}
