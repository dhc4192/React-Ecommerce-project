const FoodType = require("../models/food_type");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new FoodType({ name, slug: slugify(name) }).save());
  } catch (error) {
    res.status(400).send("Food Type: create failed");
  }
};

exports.list = async (req, res) => {
  const food_type = await FoodType.find({}).sort({ createdAt: -1 }).exec();
  res.json(food_type);
};

exports.read = async (req, res) => {
  const food_type = await FoodType.findOne({ slug: req.params.slug }).exec();
  res.json(food_type);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await FoodType.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
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
    }).exec();
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Food Type: delete failed");
  }
};
