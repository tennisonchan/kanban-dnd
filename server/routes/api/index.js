const express = require("express");
const router = express.Router();
const columnsRouter = require("./columns");
const notesRouter = require("./notes");
const projectsRouter = require("./projects");
const usersRouter = require("./users");
const validateJWT = require("../../middlewares/validateJWT");

router.use("/", usersRouter);

router.use(validateJWT);

router.use("/", projectsRouter);
router.use("/", columnsRouter);
router.use("/", notesRouter);

module.exports = router;
