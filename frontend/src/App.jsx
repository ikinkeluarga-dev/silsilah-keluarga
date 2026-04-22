import { useState } from "react";

export default function App() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  const addPost = () => {
    if (!post) return;
    setPosts([{ text: post }, ...posts]);
    setPost("");
  };

  return (
    <div>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h2>SilsilahKeluarga</h2>
      </div>

      <div style={styles.container}>
        {/* SIDEBAR */}
        <div style={styles.sidebar}>
          <p>🏠 Beranda</p>
          <p>🌳 Silsilah</p>
          <p>👥 Teman</p>
          <p>⚙️ Pengaturan</p>
        </div>

        {/* FEED */}
        <div style={styles.feed}>
          <h3>Buat Postingan</h3>

          <div style={styles.card}>
            <input
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Tulis sesuatu..."
              style={styles.input}
            />
            <button onClick={addPost} style={styles.button}>
              Posting
            </button>
          </div>

          <h3>Postingan</h3>
          {posts.map((p, i) => (
            <div key={i} style={styles.post}>
              👤 {p.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    background: "#4f46e5",
    color: "white",
    padding: "15px",
    textAlign: "center",
  },
  container: {
    display: "flex",
  },
  sidebar: {
    width: "200px",
    background: "#f3f4f6",
    padding: "20px",
    height: "100vh",
  },
  feed: {
    flex: 1,
    padding: "20px",
  },
  card: {
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "70%",
    marginRight: "10px",
  },
  button: {
    padding: "10px",
    cursor: "pointer",
  },
  post: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
};
