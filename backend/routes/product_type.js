const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  create,
  read,
  update,
  remove,
  list,
  getFoodTypes,
  getTreatTypes,
  getSupplyTypes,
} = require("../controllers/product_type");

router.get("/product_types", list);
router.get("/product_type/:slug", read);
router.post("/product_type", authCheck, adminCheck, create);
router.put("/product_type/:slug", authCheck, adminCheck, update);
router.delete("/product_type/:slug", authCheck, adminCheck, remove);
router.get("/product_type/food_types/:_id", getFoodTypes);
router.get("/product_type/treat_types/:_id", getTreatTypes);
router.get("/product_type/supply_types/:_id", getSupplyTypes);

module.exports = router;
