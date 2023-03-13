const router = require("express").Router();
// const isAuthenticated = require("../middlewares/isAuthenticated");
const Profile = require("../models/Profile.model");
const foodsModele = require("../models/Food.model");
const foodsConsumeModele = require("../models/Consume.model");

//All routes are prefixed with /api/board

//**********Create Profile Page (front: /createprofile)**************************************************/
//Creates the user's profile

router.post("/profile", async (req, res, next) => {
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

    if (!profileToDelete) {
      return res.status(404).json({ message: "Profile not found" });
    } else {
      res.status(204).json({ message: "Profile has been deleted" });
    }
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
    const food = await foodsModele.find();
    res.status(200).json({ food });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//ajoute un aliment spécifique

router.post("/foods/:id", async (req, res) => {
  try {
    const foodSearched = await foodsModele.findById(req.params.id);
    if (!foodSearched) {
      return res.status(404).json({ message: "Food not found" });
    }
    const { name, calories, carbohydrates, protein } = foodSearched;
    console.log("foodSEARCG", foodSearched);
    const consumedFood = new foodsConsumeModele({
      name,
      calories,
      carbohydrates,
      protein,
      user: req.user._id,
    });
    console.log("foodConsume", consumedFood);
    await consumedFood.save();
    res.status(200).json({ message: "Food added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error to add aliment" });
  }
});

//display the consume food
router.get("/foods/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const foodConsume = await foodsConsumeModele.findById(req.params.id);
    res.json({ foodConsume, message: `Here you go, you add ${name}` });
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
