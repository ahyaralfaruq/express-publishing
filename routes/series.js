const express = require("express");
const router = express.Router();

// controllers
const {
   getSeries,
   createSeries,
   getSeriesById,
   updateSeries,
   deleteSeries,
} = require("../controllers/series.js");

const validateSeries = (req, res, next) => {
   const { series } = req.body;

   return !series.name.trim() || !series.description.trim()
      ? res.sendStatus(400)
      : next();
};

router.get("/", getSeries);
router.post("/", validateSeries, createSeries);
router.get("/:id", getSeriesById);
router.put("/:id", validateSeries, updateSeries);
router.delete("/:id", deleteSeries);

module.exports = router;
