import React, { useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import NoteForm from "app/components/NoteForm";
import ColumnBoardHeader from "app/components/ColumnBoardHeader";
import ColumnCard from "app/components/ColumnCard";

const useStyles = makeStyles((theme) => ({
  columnBoard: {
    minWidth: "355px",
    maxWidth: "355px",
    borderWidth: "1px",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "column",
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  columnCards: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const ColumnBoard = (props) => {
  const { column } = props;
  const { name, notes = {}, noteOrder = [] } = column;
  const classes = useStyles();
  const [isAddingNote, setIsAddingNote] = useState(false);
  const noteCount = noteOrder.length;

  const handleCreate = () => {
    setIsAddingNote(true);
  };

  const handleEdit = () => {};

  const handleCancelEditNote = () => {
    setIsAddingNote(false);
  };

  const handleCreateNote = (note) => {};

  return (
    <Box className={classes.columnBoard}>
      <ColumnBoardHeader
        columnName={name}
        noteCount={noteCount}
        onCreate={handleCreate}
        onEdit={handleEdit}
      />
      {isAddingNote && (
        <NoteForm onCreate={handleCreateNote} onCancel={handleCancelEditNote} />
      )}
      <div className={classes.columnCards}>
        {noteOrder.map((noteId) => (
          <ColumnCard key={noteId} note={notes[noteId]} />
        ))}
      </div>
    </Box>
  );
};

export default ColumnBoard;
