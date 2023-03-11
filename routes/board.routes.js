const router = require("express").Router();
// const isAuthenticated = require("../middlewares/isAuthenticated");
const Profile = require("../models/Profile.model");

// router.get("/profile", isAuthenticated, (req, res) => {
//   res.json({ user: req.user, message: "profile ok" });
// });

//All routes are prefixed with /api/board

router.post("/profile", async (req, res, next) => {
  try {
    const profileInfo = req.body;

    const newProfile = await Profile.create({
      ...profileInfo,
      //req.user is define in IsAuthenticated middlware. Board is protected by the middleware(IsAuth) so everything in isAuthenticated
      user: req.user._id,
    });
    res.status(201).json(newProfile);
  } catch (error) {
    next(error);
  }
});

//Get all food from API

router.get("/foods", async (req, res) => {
  try {
    res.status(302).json();
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
