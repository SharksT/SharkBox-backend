const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server);
// Realtime
io.on("connection", socket => {
  socket.on("connectRoom", box => {
    socket.join(box);
  });
});

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-tejxt.mongodb.net/test?retryWrites=true",
  {
    useNewUrlParser: true
  }
);
mongoose.set("useCreateIndex", true);

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));
app.use(require("./routes"));

server.listen(process.env.PORT || 3338);