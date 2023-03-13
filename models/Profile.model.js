const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  gender: { type: String, required: true, enum: ["Man", "Woman"] },
  age: { type: Number, required: true },
  currentHeight: { type: Number, required: true },

  currentWeight: { type: Number, required: true, decimal: 1 },

  currentImc: { type: Number },
  weightGoal: { type: Number, required: true },
  dailyCaloriesGoal: { type: Number },
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
