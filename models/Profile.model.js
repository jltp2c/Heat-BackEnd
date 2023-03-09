const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
  gender: { type: String, required: true, enum: ['woman', 'man'] },
  age: { type: Number, required: true },
  currentHeight: { type: Number, required: true },
  currentWeight: { type: Number, required: true },
  currentImc: { type: Number, required: true },
  weightGoal: { type: Number, required: true },
  dailyCaloriesGoal: { type: Number, required: true },
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;
