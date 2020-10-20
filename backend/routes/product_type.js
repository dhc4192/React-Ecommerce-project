const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/product_type");

router.get("/product_types", list);
router.get("/product_type/:slug", read);
router.post("/product_type", authCheck, adminCheck, create);
router.put("/product_type/:slug", authCheck, adminCheck, update);
router.delete("/product_type/:slug", authCheck, adminCheck, remove);

module.exports = router;
