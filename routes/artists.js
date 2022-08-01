const express = require("express");
const router = express.Router();

// the controllers
const {
   getAllArtists,
   createNewArtists,
} = require("../controllers/artists.js");

router.get("/artists", getAllArtists);
router.post("/artists", createNewArtists);

module.exports = router;
