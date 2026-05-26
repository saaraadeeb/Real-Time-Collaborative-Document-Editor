const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("send-message", (data) => {
    socket.broadcast.emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});