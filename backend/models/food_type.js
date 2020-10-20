const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const foodTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Field is required",
      minlength: [3, "Minimum 3 characters required."],
      maxlength: [32, "Maximum 32 characters allowed."],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    productTypeRef: {
      type: ObjectId,
      ref: "ProductType",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodTypes", foodTypeSchema);
