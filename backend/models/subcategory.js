const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
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
    categoryRef: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);



