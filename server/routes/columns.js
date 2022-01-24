const express = require("express");
const router = express.Router();
const column_controller = require("../controllers/columnController");

router.get("/columns/:id", column_controller.column_read);
router.post("/column", column_controller.column_create);
router.patch("/column", column_controller.column_update);
router.delete("/columns/:id", column_controller.column_delete);
router.post("/columns/reorder", column_controller.columns_reorder);

module.exports = router;
