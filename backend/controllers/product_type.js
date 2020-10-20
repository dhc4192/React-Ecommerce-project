const ProductType = require("../models/product_type");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, productCategoryRef } = req.body;
    res.json(
      await new ProductType({ name, productCategoryRef, slug: slugify(name) }).save()
    );
  } catch (err) {
    res.status(400).send("Product Type: create failed");
  }
};

exports.list = async (req, res) =>
  res.json(await ProductType.find({}).sort({ productCategoryRef: 1 }).exec());

exports.read = async (req, res) => {
  let product_type = await ProductType.findOne({ slug: req.params.slug }).exec();
  res.json(product_type);
};

exports.update = async (req, res) => {
  const { name, productCategoryRef } = req.body;
  try {
    const updated = await ProductType.findOneAndUpdate(
      { slug: req.params.slug },
      { name, productCategoryRef, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Product Type: update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await ProductType.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Product Type: delete failed");
  }
};
