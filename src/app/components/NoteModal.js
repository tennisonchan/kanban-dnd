import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

const NoteModal = (props) => {
  const { t } = useTranslation();
  const {
    title = t("NoteModal.default.title"),
    note = {},
    buttonText = t("NoteModal.default.buttonText"),
    isOpen,
    onClose,
    onSubmit,
  } = props;
  const [noteName, setNoteName] = useState(note?.name || "");
  const [noteContent, setNoteContent] = useState(note?.content || "");
  const noInputValue = !noteName;
  const handleChange = (event) => {
    setNoteName(event.target.value);
  };
  const handleClose = () => {
    // cancel editing note do not clear the text field
    // setNoteName("");
    // setNoteContent("");
    onClose();
  };

  const handleSubmit = () => {
    onSubmit({
      ...note,
      name: noteName,
      content: noteContent,
    });
    setNoteName("");
    setNoteContent("");
    handleClose();
  };

  const handleChangeContent = (event) => {
    setNoteContent(event.target.value);
  };

  useEffect(() => {
    setNoteName(note?.name);
  }, [note?.name]);

  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      aria-labelledby="modal-title"
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="modal-title" onClose={handleClose}>
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          required
          fullWidth
          id="outlined-required"
          label={t("NoteModal.TextField.noteName.label")}
          placeholder={t("NoteModal.TextField.noteName.placeholder")}
          value={noteName}
          onChange={handleChange}
          autoFocus
        />
        <Box sx={{ paddingTop: 1 }}>
          <TextField
            label={t("NoteModal.TextField.noteContent.label")}
            placeholder={t("NoteModal.TextField.noteContent.placeholder")}
            multiline
            maxRows={4}
            fullWidth
            variant="outlined"
            sx={{ flex: 1 }}
            value={noteContent}
            onChange={handleChangeContent}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          variant="contained"
          disabled={noInputValue}
          onClick={handleSubmit}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteModal;
