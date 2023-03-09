const { Schema, model } = require("mongoose");

const consumeSchema = new Schema(
  {
    foodConsumed: {
      type: String,
      required: true,
    },
    quantityConsumed: {
      type: Number,
      required: true,
    },
    caloriesConsumed: {
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
