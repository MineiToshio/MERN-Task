const express = require("express");
const morgan = require("morgan");
const path = require("path");

const { mongoose } = require("./database");

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/tasks", require("./routes/task.routes.js"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port 3000 ${app.get("port")}`)
});