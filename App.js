import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessage(data);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    setMessage(value);

    socket.emit("send-message", value);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Real-Time Collaborative Editor</h1>

      <textarea
        rows="15"
        cols="80"
        value={message}
        onChange={handleChange}
        placeholder="Start typing..."
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
        }}
      />
    </div>
  );
}

export default App;