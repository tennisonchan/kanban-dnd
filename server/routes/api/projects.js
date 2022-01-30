const express = require("express");
const router = express.Router();
const {
  get_projects,
  get_projects_id,
  post_project,
  patch_project,
  delete_project_id,
} = require("../../controllers/projectController");

router.get("/projects", get_projects);
router.get("/projects/:id", get_projects_id);
router.post("/project/", post_project);
router.patch("/project/", patch_project);
router.delete("/project/:id", delete_project_id);

module.exports = router;
