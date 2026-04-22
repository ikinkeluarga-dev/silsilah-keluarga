import { useState } from "react";
import "./App.css";

export default function App() {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Bapak",
      gender: "L",
      fatherId: null,
      motherId: null,
      spouseIds: [2],
      status: "hidup",
      photo: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 2,
      name: "Ibu",
      gender: "P",
      fatherId: null,
      motherId: null,
      spouseIds: [1],
      status: "hidup",
      photo: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: 3,
      name: "Anak 1",
      gender: "L",
      fatherId: 1,
      motherId: 2,
      spouseIds: [],
      status: "hidup",
      photo: "https://i.pravatar.cc/100?img=3",
    },
  ]);

  const renderChildren = (fatherId, motherId) => {
    return members.filter(
      (m) => m.fatherId === fatherId && m.motherId === motherId
    );
  };

  const renderTree = (person) => {
    if (!person) return null;

    const spouses = members.filter((m) =>
      person.spouseIds.includes(m.id)
    );

    const children = renderChildren(person.id, spouses[0]?.id);

    return (
      <div className="nodeWrapper">
        {/* PASANGAN */}
        <div className="couple">
          <Card person={person} />
          {spouses.map((s) => (
            <Card key={s.id} person={s} />
          ))}
        </div>

        {/* ANAK */}
        {children.length > 0 && (
          <div className="children">
            {children.map((c) => (
              <div key={c.id}>{renderTree(c)}</div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Silsilah Keluarga</h1>
      {renderTree(members[0])}
    </div>
  );
}

function Card({ person }) {
  return (
    <div className="card">
      <img src={person.photo} alt="" />
      <h4>{person.name}</h4>
      <p>{person.gender === "L" ? "👨" : "👩"}</p>
      <p style={{ color: person.status === "almarhum" ? "red" : "green" }}>
        {person.status}
      </p>
    </div>
  );
}
