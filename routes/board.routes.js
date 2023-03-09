const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here board");
});

module.exports = router;
