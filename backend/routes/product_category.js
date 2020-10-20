const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  create,
  read,
  update,
  remove,
  list,
  getProductTypes,
} = require("../controllers/product_category");

router.get("/product_categories", list);
router.get("/product_category/:slug", read);
router.post("/product_category", authCheck, adminCheck, create);
router.put("/product_category/:slug", authCheck, adminCheck, update);
router.delete("/product_category/:slug", authCheck, adminCheck, remove);
router.get("/product_category/product_types/:_id", getProductTypes);

module.exports = router;
