const express = require("express");
const router = express.Router({ mergeParams: true });

// console.log(router);

const {
   getIssues,
   postIssues,
   cekUpdate,
   updateIssues,
   deleteIssues,
} = require("../controllers/issues.js");

router.get("/:issueId", cekUpdate);

router.get("/", getIssues);
router.post("/", postIssues);
router.put("/:issueId", updateIssues);
router.delete("/:issueId", deleteIssues);

module.exports = router;
