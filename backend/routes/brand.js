const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const { create, read, update, remove, list } = require("../controllers/brand");

router.get("/brands", list);
router.get("/brand/:slug", read);
router.post("/brand", authCheck, adminCheck, create);
router.put("/brand/:slug", authCheck, adminCheck, update);
router.delete("/brand/:slug", authCheck, adminCheck, remove);

module.exports = router;
