const express = require("express");
const router = express.Router();
const columnsRouter = require("./columns");
const notesRouter = require("./notes");
const projectsRouter = require("./projects");

router.use("/", projectsRouter);
router.use("/", columnsRouter);
router.use("/", notesRouter);

module.exports = router;
