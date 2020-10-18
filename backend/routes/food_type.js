const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/food_type");

router.get("/food_types", list);
router.get("/food_type/:slug", read);
router.post("/food_type", authCheck, adminCheck, create);
router.put("/food_type/:slug", authCheck, adminCheck, update);
router.delete("/food_type/:slug", authCheck, adminCheck, remove);

module.exports = router;
