const Brand = require("../models/brand");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new Brand({ name, slug: slugify(name) }).save());
  } catch (error) {
    res.status(400).send("Brand: create failed");
  }
};

exports.list = async (req, res) => {
  const brand = await Brand.find({}).sort({ createdAt: -1 }).exec();
  res.json(brand);
};

exports.read = async (req, res) => {
  const brand = await Brand.findOne({ slug: req.params.slug }).exec();
  res.json(brand);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Brand.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Brand: update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Brand.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Brand: delete failed");
  }
};

