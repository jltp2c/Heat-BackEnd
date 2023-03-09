const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");
const User = require("../models/User.model");

//Sign Up page
router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  //check if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  // check if the email provided as the correct syntax
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return res.status(400).json({ message: "Error mail ! Try again" });
  }

  //check for the length's password to be at least 6 characters
  if (password.length < 6) {
    return res.status(400).json({
      message: "Please put at least 6 characters",
    });
  }

  try {
    //check if the username provided already exist or not ! cause need to be unique
    const foundUser = await User.findOne({ username: username });
    if (foundUser) {
      return res
        .status(400)
        .json({ message: "This username is already taken" });
    }

    //check if the email provided already exist or not ! cause need to be unique
    const foundEmail = await User.findOne({ email: email });
    if (foundEmail) {
      return res.status(400).json({ message: "This email is already taken" });
    }

    //use bcrypt to encode the password
    const generatedSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, generatedSalt);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "The user was created." });
  } catch (error) {
    // next(error)
    return res
      .status(500)
      .json({ message: "Something went wrong during signup", error });
  }

  // res.json("Sign Up");
});

//Login Page
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }
  try {
    //Checks if the user already exists. Select only  the corresponding password and omits other infos. Doesn't check if the passwords match (yet)!
    const foundUser = await User.findOne({ username }).select("password");
    if (!foundUser) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    //Checks the inputed password VS the user's stored password
    const matchingPasswords = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!matchingPasswords) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    //Creates a token, takes the secret of the .ENV file, uses the HS256 encryption algorithm. Token expires in 24h
    const token = jsonWebToken.sign(
      { id: foundUser._id },
      process.env.TOKEN_SECRET,
      { algorithm: "HS256", expiresIn: "1d" }
    );

    return res
      .status(200)
      .json({ token, message: "Token created and user logged in" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
