import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import NoteForm from "app/components/NoteForm";
import ColumnBoardHeader from "app/components/ColumnBoardHeader";
import ColumnCard from "app/components/ColumnCard";
import { useNotes } from "app/hooks";
import EditColumnMenu from "app/components/EditColumnMenu";

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
  const [{ notes = {}, noteOrders = {} }, { addNote }] = useNotes();
  const { id: columnId, name } = column;
  const noteOrder = noteOrders?.[columnId] || [];
  const classes = useStyles();
  const [isAddingNote, setIsAddingNote] = useState(false);
  const noteCount = noteOrder.length;
  const [isOpenEditMenu, setIsOpenEditMenu] = useState(false);
  const anchor = useRef(null);

  const handleCreate = () => {
    setIsAddingNote(true);
  };

  const handleOpenEditMenu = () => {
    setIsOpenEditMenu(true);
  };

  const handleCancelEditNote = () => {
    setIsAddingNote(false);
  };

  const handleCreateNote = (content) => {
    const newNote = { content, createdAt: Date.now() };
    addNote(newNote, columnId);
  };
  const handleCloseEditMenu = () => {
    setIsOpenEditMenu(false);
  };
  const handleDeleteColumn = () => {};
  const handleEditColumn = () => {};

  return (
    <Box className={classes.columnBoard}>
      <ColumnBoardHeader
        ref={anchor}
        columnName={name}
        noteCount={noteCount}
        onCreate={handleCreate}
        onEdit={handleOpenEditMenu}
      />
      <EditColumnMenu
        anchorEl={anchor.current}
        isOpen={isOpenEditMenu}
        onDelete={handleDeleteColumn}
        onClose={handleCloseEditMenu}
        onEdit={handleEditColumn}
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
