const ProductCategory = require("../models/product_category");
const ProductType = require("../models/product_type");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new ProductCategory({ name, slug: slugify(name) }).save());
  } catch (error) {
    res.status(400).send("Product Category: create failed");
  }
};

exports.list = async (req, res) => {
  const product_category = await ProductCategory.find({})
    .sort({ name: 1 })
    .exec();
  res.json(product_category);
};

exports.read = async (req, res) => {
  const product_category = await ProductCategory.findOne({
    slug: req.params.slug,
  }).exec();
  res.json(product_category);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await ProductCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Product Category: update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await ProductCategory.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Product Category: delete failed");
  }
};

exports.getProductTypes = (req, res) => {
  ProductType.find({ productCategoryRef: req.params._id }).exec(
    (error, product_type) => {
      if (error) console.log(error);
      res.json(product_type);
    }
  );
};
