const express = require("express");
const router = express.Router();

// the controllers
const {
   getArtists,
   createArtists,
   updateArtist,
   getArtistById,
   deleteArtist,
} = require("../controllers/artists.js");

router.get("/", getArtists);
router.post("/", createArtists);

router.get("/:id", getArtistById);
router.put("/:id", updateArtist);
router.delete("/:id", deleteArtist);

module.exports = router;
