// Modules
const express = require("express");
const connectDB = require("./connect");

// Create app object
const app = express();

// Declare server parameters
const port = 8080;
const appName = "Task Manager";

// Middleware
app.use(express.json());

// Data model (schema)
const tasks = require("./Task");

// Routes
// app.get("/tm/tasks")        - get all the tasks
// app.get("/tm/tasks/:id")    - get a task
// app.post("/tm/tasks")       - add a new task
// app.patch("/tm/tasks/:id")  - update a task
// app.delete("/tm/tasks/:id") - delete a task


// get all the tasks
app.get("/tm/tasks", async (req,res)=>{
  try {
    const task = await tasks.find({});
    res.status(200).json({task});
  } catch (error) {
    res.status(500).json({msg: error});
  };
});

// get one task
// use mongoose findOne() function for this

// add a task
app.post("/tm/tasks", async (req,res)=>{
  try {
    const task = await tasks.create(req.body);
    res.status(200).json({task});
  } catch (error) {
    res.status(500).json({msg: error});
  };
});

// update a task
// use mongoose fineOneAndUpdate function for this

// delete a task
// use mongoose findOneAndDelete function for this

// Connect to the database and start the appl server
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {console.log(`An Application Server is listening on port ${port}.`)});
  } catch (error) {
    console.log(error);
  };
}

start();
