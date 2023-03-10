const mongoose = require("mongoose");
const Food = require("../models/Food.model");
const foodData = require("./data.json");

require("dotenv").config();
require("../db/index");

async function dataBaseSeed() {
  await Food.deleteMany();
  await Food.create(foodData);
  mongoose.disconnect();
}

dataBaseSeed();
