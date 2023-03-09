const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here auth");
});

module.exports = router;
