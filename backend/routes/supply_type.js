const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/supply_type");

router.get("/supply_types", list);
router.get("/supply_type/:slug", read);
router.post("/supply_type", authCheck, adminCheck, create);
router.put("/supply_type/:slug", authCheck, adminCheck, update);
router.delete("/supply_type/:slug", authCheck, adminCheck, remove);

module.exports = router;
