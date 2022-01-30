const express = require("express");
const router = express.Router();
const { jwt } = require("../../controllers/userController");

router.post("/jwt", jwt);

module.exports = router;
