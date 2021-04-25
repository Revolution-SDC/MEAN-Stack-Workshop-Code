const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Database connection
mongoose.connect("mongodb://localhost:27017/todo", mongoOptions, (err, db) => {
  if (err) throw err;
  console.log("Successfully connected to Database.");
});

const app = express();
app.use(express.json());
app.use(cors());

const todo = require("./routes/todo-routes");
app.use("/todo", todo);

const port = 3000;

app.get("/", (request, response) => {
  console.log("Base route hit!");
  response.json({ success: true, msg: "Base Route HIT!" });
});

// HTTP Server
// 127.0.0.1:3000
app.listen(port, () => {
  console.log(`Server Started on Port: ${port}`);
});
