const { Schema, model } = require("mongoose");

const Foodschema = new Schema(
  {
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
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Food = model("Food", Foodschema);

module.exports = Food;
