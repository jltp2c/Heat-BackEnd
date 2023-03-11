const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  gender: { type: String, required: true, enum: ["woman", "man"] },
  age: { type: Number, required: true },
  currentHeight: { type: Number, required: true },
  currentWeight: { type: Number, required: true },
  currentImc: { type: Number },
  weightGoal: { type: Number, required: true },
  dailyCaloriesGoal: { type: Number },
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
