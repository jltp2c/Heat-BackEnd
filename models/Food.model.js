const { Schema, model } = require("mongoose");

const Foodschema = new Schema({
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  carbohydrates: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
});

const Food = model("Food", Foodschema);

module.exports = Food;
