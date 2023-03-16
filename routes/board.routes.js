const router = require("express").Router();
// const isAuthenticated = require("../middlewares/isAuthenticated");
const Profile = require("../models/Profile.model");
const foodsModel = require("../models/Food.model");
const foodsConsumeModele = require("../models/Consume.model");
const User = require("../models/User.model.js");

//All routes are prefixed with /api/board

//**********Create Profile Page (front: /createprofile)**************************************************/
//Creates the user's profile

router.post("/profile", async (req, res, next) => {
  const { gender, age, currentHeight, currentWeight, weightGoal } = req.body;
  if (
    gender === "disabled" ||
    !gender ||
    !age ||
    !currentHeight ||
    !currentWeight ||
    !weightGoal
  ) {
    return res.status(400).json({ message: "Please fill all fields " });
  }

  try {
    const profileInfo = req.body;

    const newProfile = await Profile.create({
      ...profileInfo,
      //req.user is defined in the IsAuthenticated middleware. Board is protected by the middleware(IsAuth) so everything in isAuthenticated
      user: req.user._id,
    });
    res.status(201).json(newProfile);
  } catch (error) {
    next(error);
  }
});

//*******************Profile Page  (front:/board/profile)************************************************************/

//Display the user's profile

router.get("/profile", async (req, res, next) => {
  try {
    // let profile = await Profile.find({
    //   user: req.user._id,
    // });
    let userName = await Profile.findOne({ user: req.user._id }).populate(
      "user"
    );
    console.log("le user req.user.id  est :", { user: req.user });
    res.status(200).json(userName);
  } catch (error) {
    next(error);
  }
});

//Update the user's profile

router.patch("/profile/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { gender, age, currentWeight, weightGoal } = req.body;

    if (age < 18) {
      return res
        .status(400)
        .json({ message: "You must be 18 or more to use this app" });
    }
    if (currentWeight < 20 || weightGoal < 20) {
      return res
        .status(400)
        .json({ message: "Please provide a number greater than 20" });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { gender, age, currentWeight, weightGoal },
      { new: true }
    );
    res.status(202).json(updatedProfile);
  } catch (error) {
    next(error);
  }
});

//Delete the user's profile //to discuss with the team cause i think the way with the token is better

router.delete("/profile", async (req, res) => {
  try {
    await Profile.findOneAndDelete({
      user: req.user._id,
    });
    res.sendStatus(204);

    // console.log("le profil to delete  :", profileToDelete);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "profil not deleted" });
  }
});

//***************Food Page**********************************************************************/
//Get all food from API

router.get("/foods", async (req, res) => {
  try {
    //display all data foods storage
    const food = await foodsModel.find();
    res.status(200).json({ food });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//ajoute un aliment spécifique

router.post("/foods/:id", async (req, res) => {
  try {
    const foodSearched = await foodsModel.findById(req.params.id);
    if (!foodSearched) {
      return res.status(404).json({ message: "Food not found" });
    }

    // console.log("foodSEARCG", foodSearched);
    const consumed = await foodsConsumeModele.create({
      food: foodSearched._id,
      user: req.user._id,
    });

    const { food: consumedFood, createdAt } = await consumed.populate("food");
    console.log("foodConsume", consumedFood);
    //allow us to save in the mongoDB database

    res
      .status(200)
      .json({ message: "Food added successfully", consumedFood, createdAt });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error to add aliment" });
  }
});

//display the consume food
router.get("/foods/consumed", async (req, res) => {
  try {
    const date = req.query.date ? new Date(req.query.date) : new Date();
    // console.log("DATE", date);
    const [today] = date.toISOString().split("T");
    const midnight = new Date(today);
    const nextMidnight = new Date(today);
    nextMidnight.setDate(nextMidnight.getDate() + 1);

    console.log(midnight, nextMidnight);

    const foodConsumed = await foodsConsumeModele
      .find({
        user: req.user._id,
        createdAt: { $gt: midnight, $lt: nextMidnight },
      })
      .populate({
        path: "food",
        select: { createdAt: 0, updatedAt: 0 },
      });
    console.log(foodConsumed);
    res.status(200).json({ foodConsumed });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//delete the consume food
router.delete("/foods/:id", async (req, res) => {
  try {
    const foodDeleted = await foodsConsumeModele.findByIdAndDelete(
      req.params.id
    );
    if (!foodDeleted) {
      return res.status(404).json({ message: "Food not found" });
    } else {
      res.status(204).json({ message: "Food has been deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
