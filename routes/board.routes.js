const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/profile", isAuthenticated, (req, res) => {
  res.json({ user: req.user, message: "profile ok" });
});

module.exports = router;
