const { Schema, model } = require("mongoose");

const consumeSchema = new Schema(
  {
    food: {
      type: Schema.Types.ObjectId,
      ref: "Food",
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
