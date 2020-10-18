const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/treat_type");

router.get("/treat_types", list);
router.get("/treat_type/:slug", read);
router.post("/treat_type", authCheck, adminCheck, create);
router.put("/treat_type/:slug", authCheck, adminCheck, update);
router.delete("/treat_type/:slug", authCheck, adminCheck, remove);

module.exports = router;
