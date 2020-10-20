const FoodType = require("../models/food_type");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, productTypeRef } = req.body;
    res.json(
      await new FoodType({ name, productTypeRef, slug: slugify(name) }).save()
    );
  } catch (err) {
    res.status(400).send("Food Type: create failed");
  }
};

exports.list = async (req, res) =>
  res.json(await FoodType.find({}).sort({ name: 1 }).exec());

exports.read = async (req, res) => {
  let food_type = await FoodType.findOne({ slug: req.params.slug }).exec();
  res.json(food_type);
};

exports.update = async (req, res) => {
  const { name, productTypeRef } = req.body;
  try {
    const updated = await FoodType.findOneAndUpdate(
      { slug: req.params.slug },
      { name, productTypeRef, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Food Type: update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await FoodType.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Food Type: delete failed");
  }
};
