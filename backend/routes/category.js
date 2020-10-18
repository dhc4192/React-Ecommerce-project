const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  create,
  read,
  update,
  remove,
  list,
  getSubCategories,
} = require("../controllers/category");

router.get("/categories", list);
router.get("/category/:slug", read);
router.post("/category", authCheck, adminCheck, create);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.get("/category/subcategories/:_id", getSubCategories);

module.exports = router;
