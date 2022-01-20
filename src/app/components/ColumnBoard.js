import React, { useState } from "react";
import Box from "@mui/material/Box";
import AddColumnModal from "app/components/AddColumnModal";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  columnBoard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ColumnBoardHeader = (props) => {};

const NoteForm = (props) => {};

const ColumnNote = () => {};

const ColumnBoard = (props) => {
  const { column } = props;
  const { name, notes = {}, noteOrder = [] } = column;
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box className={classes.columnBoard}>
      <ColumnBoardHeader columnName={name} />
      <NoteForm />
      {noteOrder.map((noteId) => (
        <ColumnNote note={notes[noteId]} />
      ))}
    </Box>
  );
};

export default ColumnBoard;
