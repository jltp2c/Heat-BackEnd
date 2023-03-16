const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    gender: { type: String, required: true, enum: ["Woman", "Man"] },
    age: { type: Number, min: 18, max: 120, required: true },
    currentHeight: { type: Number, min: 100, max: 300, required: true },
    currentWeight: { type: Number, min: 20, max: 300, required: true },
    currentImc: { type: Number },
    weightGoal: { type: Number, min: 20, max: 300, required: true },
    dailyCaloriesGoal: { type: Number },
  },
  { timestamps: true }
);

const Profile = model("Profile", profileSchema);

module.exports = Profile;
