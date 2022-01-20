import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

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

const NoteForm = (props) => {
  const classes = useStyles();
  const { onCreate, onCancel } = props;
  const [newNote, setNewNote] = useState("");

  const handleChangeNote = (event) => {
    setNewNote(event.target.value);
  };

  const handleCancelEdit = () => {
    // cancel editing note do not clear the text field
    // setNewNote("");
    onCancel();
  };

  const handleCreateNote = () => {
    // do not close the form after adding new note
    onCreate(newNote);
    setNewNote("");
  };

  return (
    <div className={classes.noteForm}>
      <TextField
        label="Add new note"
        placeholder="Enter a note"
        multiline
        fullWidth
        color="secondary"
        variant="outlined"
        sx={{ flex: 1, color: "primary.contrastText" }}
        InputProps={{
          className: classes.textColor,
        }}
        InputLabelProps={{ className: classes.textColor }}
        value={newNote}
        onChange={handleChangeNote}
      />
      <Box sx={{ gap: 1, paddingTop: 1, display: "flex" }}>
        <Button
          sx={{ flex: 1, color: "primary.contrastText" }}
          variant="contained"
          color="secondary"
          onClick={handleCreateNote}
        >
          Add
        </Button>
        <Button
          sx={{ flex: 1, color: "primary.contrastText" }}
          color="secondary"
          variant="outlined"
          onClick={handleCancelEdit}
        >
          Cancel
        </Button>
      </Box>
    </div>
  );
};

export default NoteForm;
