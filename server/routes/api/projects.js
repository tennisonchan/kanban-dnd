const express = require("express");
const router = express.Router();
const project_controller = require("../../controllers/projectController");

router.get("/projects", project_controller.projects_read);
router.get("/projects/:id", project_controller.project_read);
router.post("/project/", project_controller.project_create);
router.patch("/project/", project_controller.project_update);
router.delete("/project/:id", project_controller.project_delete);

module.exports = router;
