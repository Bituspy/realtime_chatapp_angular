const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // Import the cors middleware

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server, {
  cors: {
    origin: "http://localhost:4200", // Update with your frontend URL
    methods: ["GET", "POST"],
  },
});
// Use the cors middleware to enable CORS
app.use(cors());

// ... your route handlers

const onlineUsers = new Set();
io.on("connection", (socket) => {
  console.log("User connected");

 socket.on('user-online', (userData) => {
  onlineUsers.add({ username: userData.username, socketId: userData.socketId });
    io.emit("online-users", Array.from(onlineUsers));
  });

  // Handle messages from clients
  socket.on("message", (message) => {
    io.emit("message", message);
  });

  // Handle user disconnection
socket.on("disconnect", () => {
  console.log("User disconnected");
  const socketId = socket.id;

  // Find and remove the disconnected user by socket ID
  onlineUsers.forEach((user) => {
    if (user.socketId === socketId) {
      onlineUsers.delete(user);
    }
  });

  console.log("Updated online users:", Array.from(onlineUsers));
  io.emit("online-users", Array.from(onlineUsers));
});




});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
