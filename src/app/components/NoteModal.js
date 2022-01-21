import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  noteForm: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    color: `${theme.palette.primary.contrastText}`,
  },
  textColor: {
    color: `${theme.palette.primary.contrastText} !important`,
  },
}));

const NoteModal = (props) => {
  const classes = useStyles();
  const {
    title = "Add a note",
    note = {},
    buttonText = "Create note",
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
          label="Note name"
          placeholder="Enter a note name"
          value={noteName}
          onChange={handleChange}
        />
        <Box sx={{ paddingTop: 1 }}>
          <TextField
            label="Add note description"
            placeholder="Enter a note description"
            multiline
            maxRows={4}
            fullWidth
            color="secondary"
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
