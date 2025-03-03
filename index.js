// import facultyRoutes from "./routes/faculty.routes.js";
// ;import libraryRoutes from "./routes/library.routes.js";
const facultyRoutes = require("./routes/facultyRoutes.js");
const libraryRoutes = require("./routes/libraryRoutes.js");
const studentRoutes = require("./routes/studentRoutes.js");
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();



var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sms'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});


const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/student", studentRoutes);
app.use("/faculty", facultyRoutes);
app.use("/library", libraryRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} \nDatabase connected`));
  })
  .catch((err) => console.log(err.message));

