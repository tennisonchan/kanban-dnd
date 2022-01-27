const express = require("express");
const router = express.Router();
const note_controller = require("../../controllers/noteController");

router.get("/notes/:id", note_controller.note_read);
router.post("/note", note_controller.note_create);
router.patch("/note", note_controller.note_update);
router.delete("/columns/:columnId/notes/:noteId", note_controller.note_delete);
router.post("/note/archive", note_controller.note_archive);
router.post("/notes/reorder", note_controller.notes_reorder);

module.exports = router;
