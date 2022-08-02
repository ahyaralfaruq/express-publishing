const express = require("express");
const router = express.Router();

// the controllers
const {
   getAllArtists,
   createNewArtists,
   updateArtist,
   getArtistById,
   deleteArtist,
} = require("../controllers/artists.js");

const validateArtist = (req, res, next) => {
   const { artist } = req.body;

   return artist.isCurrentlyEmployed !== 0 ? next() : res.sendStatus(400);
};

router.get("/artists", getAllArtists);
router.post("/artists", validateArtist, createNewArtists);
router.put("/artists/:id", updateArtist);
router.get("/artists/:id", getArtistById);
router.get("/artists/:id", deleteArtist);

module.exports = router;
