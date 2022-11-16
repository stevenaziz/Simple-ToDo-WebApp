// Get NPM modules
const express = require("express");

// Get App modules
const fm = require("./filemgr");

// Create the express http server
const app = express();

// Define static and middleware
app.use(express.static("./Client"));
app.use(express.json());

// Use the filemgr to get data from the JSON file and send it back to client
app.get("/api", async (req,res) => {
  const data = await fm.ReadData();
  res.status(200).send(data);
})


// Use filemgr to write the JSON-stringified data to the JSON file and send success status to client
app.post("/api", async (req,res) => {
  await fm.WriteData(JSON.stringify(req.body));
  res.status(200).send();
})

// page not found route
app.all("*", (req,res) => {
  res.status(404).send("<h1>Page Not Found...</h1>");
});

const appName = "My List";
const port = 8030;
app.listen(port, () => {
  console.log(`App ${appName} is running on port ${port}`);
})