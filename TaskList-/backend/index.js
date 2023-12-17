var express = require("express");
var cors = require("cors");
var userRouter = require("./routes/user.js");
var taskRouter = require("./routes/task.js");
var app = express();
var mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

const port = 4500;
const connection_url =
  "mongodb+srv://kosuriravikanth:Mongo553136@cluster0.cvvip5o.mongodb.net/TaskList";

app.listen(port, () => {
  mongoose
    .connect(connection_url)
    .then(() => {
      console.log("Successfully Connected to Database");
      console.log("Server is running on port : " + port);
    })
    .catch((error) => {
      console.log(error);
    });
});
