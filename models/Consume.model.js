const { Schema, model } = require("mongoose");

const consumeSchema = new Schema(
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Consume = model("Consume", consumeSchema);

module.exports = Consume;
