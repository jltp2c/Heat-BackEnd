const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const progressSchema = new Schema(
  {
    progressCalorie: {
      type: Number,
      required: true,
    },
    progressWeight: {
      type: Number,
      required: true,
    },
    progressImc: {
      type: Number,
      required: true,
    },
    progressDay: {
      type: Number,
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Progress = model("Progress", progressSchema);

module.exports = Progress;
