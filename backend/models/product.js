const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    nutrition: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    size: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    brand: {
      type: ObjectId,
      ref: "Brand",
    },
    food_type: {
      type: ObjectId,
      ref: "FoodType",
    },
    treat_type: {
      type: ObjectId,
      ref: "TreatType",
    },
    supply_type: {
      type: ObjectId,
      ref: "SupplyType",
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subcategories: [
      {
        type: ObjectId,
        ref: "SubCategory",
      },
    ],
    // images: {
    //   type: Array,
    // },
    // ratings: [
    //   {
    //     star: Number,
    //     postedBy: {
    //       type: ObjectId,
    //       ref: "User",
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
