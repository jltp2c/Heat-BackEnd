const User = require("../models/User.model");
const jsonWebToken = require("jsonwebtoken");

async function isAuthenticated(req, res, next) {
  //Req.headers is the html head that contains the token
  let token = req.headers.authorization;
  if (!token) {
    return res.status(500).json({ message: "no token found" });
  }

  //Bearer is a convention term to identify the token's bearer. it is not a part of the token body.
  token = token.replace("Bearer ", "");
  try {
    //Payload const checks the .env TOKEN_SECRET VS 'token'(req.headers.authorization)
    const payload = jsonWebToken.verify(token, process.env.TOKEN_SECRET);
    //User checks for an existing payload.id
    const user = await User.findById(payload.id);
    console.log(user);

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Invalid token," });
  }
}

module.exports = isAuthenticated;
