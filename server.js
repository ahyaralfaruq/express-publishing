const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
   process.env.TEST_DATABASE || "./database.sqlite"
);
// API
const routesArtists = require("./routes/artists.js");

const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
   res.send(`Welcome to my API !`);
});

app.use("/api", routesArtists);

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});