const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  gender: { type: String, required: true, enum: ["woman", "man"] },
  age: { type: Number, required: true },
  currentHeight: { type: Number, required: true, decimal: 2 },
  currentWeight: { type: Number, required: true, decimal: 1 },
  currentImc: { type: Number },
  weightGoal: { type: Number, required: true, decimal: 1 },
  dailyCaloriesGoal: { type: Number },
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
