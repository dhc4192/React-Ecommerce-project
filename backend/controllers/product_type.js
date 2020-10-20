const ProductType = require("../models/product_type");
const FoodTypes = require("../models/food_type");
const TreatTypes = require("../models/treat_type");
const SupplyTypes = require("../models/supply_type");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new ProductType({ name, slug: slugify(name) }).save());
  } catch (error) {
    res.status(400).send("Product Type: create failed");
  }
};

exports.list = async (req, res) => {
  const product_type = await ProductType.find({}).sort({ name: 1 }).exec();
  res.json(product_type);
};

exports.read = async (req, res) => {
  const product_type = await ProductType.findOne({
    slug: req.params.slug,
  }).exec();
  res.json(product_type);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await ProductType.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
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
    }).exec();
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Product Type: delete failed");
  }
};

exports.getFoodTypes = (req, res) => {
  FoodTypes.find({ productTypeRef: req.params._id }).exec(
    (error, food_type) => {
      if (error) console.log(error);
      res.json(food_type);
    }
  );
};
exports.getTreatTypes = (req, res) => {
  TreatTypes.find({ productTypeRef: req.params._id }).exec(
    (error, treat_type) => {
      if (error) console.log(error);
      res.json(treat_type);
    }
  );
};
exports.getSupplyTypes = (req, res) => {
  SupplyTypes.find({ productTypeRef: req.params._id }).exec(
    (error, supply_type) => {
      if (error) console.log(error);
      res.json(supply_type);
    }
  );
};
