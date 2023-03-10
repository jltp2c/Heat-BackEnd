const isAuthenticated = require("../middlewares/isAuthenticated");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"));

router.use(isAuthenticated);
router.use("/board", require("./board.routes"));

module.exports = router;
