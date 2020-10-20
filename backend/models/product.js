const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      maxlength: 2000,
      text: true,
    },
    nutrition: {
      type: String,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      trim: true,
      maxlength: 32,
    },
    size: {
      type: String,
      trim: true,
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
    product_category: {
      type: ObjectId,
      ref: "ProductCategory",
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    brand: {
      type: ObjectId,
      ref: "Brand",
    },
    product_types: [
      {
        type: ObjectId,
        ref: "ProductType",
      },
    ],
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
