const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const { createUpdateUser, currentUser } = require("../controllers/auth");

router.post("/create-update-user", authCheck, createUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, currentUser, adminCheck);

module.exports = router;
