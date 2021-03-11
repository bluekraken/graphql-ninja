const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: [true, "Please supply a make"],
      trim: true
    },
    model: {
      type: String,
      required: [true, "Please supply a model"],
      trim: true
    },
    colour: {
      type: String,
      required: [true, "Please supply a colour"],
      trim: true
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please supply an owner"]
    }
  },
  {
    timestamps: true
  }
);

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
