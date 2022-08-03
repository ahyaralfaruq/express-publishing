const express = require("express");
const router = express.Router();

const {
   getIssues,
   postIssues,
   getIssuesById,
   updateIssues,
   deleteIssues,
} = require("../controllers/issues.js");

router.get("/issues", getIssues);
router.get("/issues", postIssues);
router.get("/issues/:issueId", updateIssues);
router.get("/issues/:issueId", deleteIssues);

module.exports = router;
