const Category = require("../models/category");
const SubCategories = require("../models/subcategory");
const slugify = require("slugify");
const subcategory = require("../models/subcategory");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (error) {
    res.status(400).send("Category: create failed");
  }
};

exports.list = async (req, res) => {
  const category = await Category.find({}).sort({ createdAt: -1 }).exec();
  res.json(category);
};

exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Category: update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Category: delete failed");
  }
};

exports.getSubCategories = (req, res) => {
  SubCategories.find({ categoryRef: req.params._id }).exec(
    (error, subcategory) => {
      if (error) console.log(error);
      res.json(subcategory);
    }
  );
};
