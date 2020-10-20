const SupplyType = require("../models/supply_type");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, productTypeRef } = req.body;
    res.json(
      await new SupplyType({ name, productTypeRef, slug: slugify(name) }).save()
    );
  } catch (error) {
    res.status(400).send("Supply Type: create failed");
  }
};

exports.list = async (req, res) => {
  const supply_type = await SupplyType.find({}).sort({ name: 1 }).exec();
  res.json(supply_type);
};

exports.read = async (req, res) => {
  let supply_type = await SupplyType.findOne({ slug: req.params.slug }).exec();
  res.json(supply_type);
};

exports.update = async (req, res) => {
  const { name, productTypeRef } = req.body;
  try {
    const updated = await SupplyType.findOneAndUpdate(
      { slug: req.params.slug },
      { name, productTypeRef, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Supply Type: update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await SupplyType.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Supply Type: delete failed");
  }
};
