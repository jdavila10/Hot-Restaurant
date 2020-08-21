// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080; // ask Jack about why PORT is allcaps

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Variables
// =============================================================
let tables = []; // limited to 5
let waitList = []; // unlimited

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", (req, res) => {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", (req, res) => {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays json variables
app.get("/api/tables", (req, res) => {
  return res.json(tables);
});

app.get("/api/waitlist", (req, res) => {
  return res.json(waitList);
});

//take in new tables
app.post("/api/tables", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newReservation = req.body;

  console.log(newReservation);
  if(tables.length < 5){
    tables.push(newReservation);
    //res.json(newReservation)
    res.send(true);
  }
  else {
    waitList.push(newReservation);
    res.send(false);
  }
});


app.post("/api/clear", (req, res) => {
  //the internet says this might be better: arr.splice(0, arr.length)
  tables = [];
  waitList = [];
  res.end();
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
