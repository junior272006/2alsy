const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

/*  Socket.IO */
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL, // ex: https://ton-frontend.vercel.app
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(" User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    socket.broadcast.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log(" User disconnected:", socket.id);
  });
});

/*  Gestion erreurs serveur */
const errorHandler = (error) => {
  if (error.syscall !== "listen") throw error;

  const address = server.address();
  const bind = typeof address === "string"
    ? "pipe " + address
    : "port: " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
    default:
      throw error;
  }
};

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
