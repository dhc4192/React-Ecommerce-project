const TreatType = require("../models/treat_type");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, productTypeRef } = req.body;
    res.json(
      await new TreatType({ name, productTypeRef, slug: slugify(name) }).save()
    );
  } catch (error) {
    res.status(400).send("Treat Type: create failed");
  }
};

exports.list = async (req, res) => {
  const treat_type = await TreatType.find({}).sort({ name: 1 }).exec();
  res.json(treat_type);
};

exports.read = async (req, res) => {
  let treat_type = await TreatType.findOne({ slug: req.params.slug }).exec();
  res.json(treat_type);
};

exports.update = async (req, res) => {
  const { name, productTypeRef } = req.body;
  try {
    const updated = await TreatType.findOneAndUpdate(
      { slug: req.params.slug },
      { name, productTypeRef, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Treat Type: update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await TreatType.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Treat Type: delete failed");
  }
};
