const router = require("express").Router();
// const isAuthenticated = require("../middlewares/isAuthenticated");
const Profile = require("../models/Profile.model");
const foodsModele = require("../models/Food.model");
const foodsConsumeModele = require("../models/Consume.model");

// router.get("/profile", isAuthenticated, (req, res) => {
//   res.json({ user: req.user, message: "profile ok" });
// });

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
