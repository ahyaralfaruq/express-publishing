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

   const name = artist.name.trim();
   const dateOfBirth = artist.dateOfBirth.trim();
   const biography = artist.biography.trim();
   const isCurrentlyEmployed = artist.isCurrentlyEmployed === 0 ? 0 : 1;

   if (!name || !dateOfBirth || !biography) {
      return res.sendStatus(400);
   } else {
      next();
   }
};

router.get("/", getAllArtists);
router.post("/", validateArtist, createNewArtists);

router.get("/:id", getArtistById);
router.put("/:id", validateArtist, updateArtist);
router.delete("/:id", deleteArtist);

module.exports = router;
