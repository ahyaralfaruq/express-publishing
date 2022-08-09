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

const issuesRouter = require("./issues.js");

router.use("/:seriesId/issues", issuesRouter);

router.get("/", getSeries);
router.post("/", createSeries);
router.get("/:id", getSeriesById);
router.put("/:id", updateSeries);
router.delete("/:id", deleteSeries);

module.exports = router;
