import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import ColumnBoardHeader from "app/components/ColumnBoardHeader";
import ColumnCard from "app/components/ColumnCard";
import { useColumns, useNotes } from "app/hooks";
import EditColumnMenu from "app/components/EditColumnMenu";
import ColumnModal from "app/components/ColumnModal";
import NoteModal from "app/components/NoteModal";
import { useSelector } from "react-redux";

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
  const classes = useStyles();
  const { columnId } = props;
  const [, { removeColumn, editColumn, getColumnById }] = useColumns();
  const [{ notes }, { addNote, getNoteOrderByColumnId }] = useNotes();
  const column = useSelector((state) => getColumnById(state, columnId));
  const noteOrder = useSelector((state) =>
    getNoteOrderByColumnId(state, columnId)
  );
  const [isOpenNoteModal, setIsOpenNoteModal] = useState(false);
  const noteCount = noteOrder?.length || 0;
  const [isOpenEditMenu, setIsOpenEditMenu] = useState(false);
  const anchor = useRef(null);

  const [isOpenColumnModal, setIsOpenColumnModal] = useState(false);

  const handleClickCreateNote = () => {
    setIsOpenNoteModal(true);
  };

  const handleOpenEditMenu = () => {
    setIsOpenEditMenu(true);
  };

  const handleCloseNoteModal = () => {
    setIsOpenNoteModal(false);
  };

  const handleCreateNote = (note) => {
    addNote(note, columnId);
  };
  const handleCloseEditMenu = () => {
    setIsOpenEditMenu(false);
  };
  const handleDeleteColumn = () => {
    removeColumn(columnId);
    handleCloseEditMenu();
  };
  const handleOpenColumnModel = () => {
    setIsOpenColumnModal(true);
  };

  const handleCloseColumnModal = () => {
    setIsOpenColumnModal(false);
  };
  const handleEditColumn = (column) => {
    editColumn(column);
    handleCloseColumnModal();
  };

  return (
    <Box className={classes.columnBoard}>
      <ColumnBoardHeader
        ref={anchor}
        columnName={column.name}
        noteCount={noteCount}
        onCreate={handleClickCreateNote}
        onEdit={handleOpenEditMenu}
      />
      <EditColumnMenu
        anchorEl={anchor.current}
        isOpen={isOpenEditMenu}
        onDelete={handleDeleteColumn}
        onClose={handleCloseEditMenu}
        onEdit={handleOpenColumnModel}
      />
      <ColumnModal
        isOpen={isOpenColumnModal}
        onClose={handleCloseColumnModal}
        onSubmit={handleEditColumn}
        column={column}
        buttonText="Update column"
        title="Edit column"
      />
      <NoteModal
        isOpen={isOpenNoteModal}
        onClose={handleCloseNoteModal}
        onSubmit={handleCreateNote}
        buttonText="Add"
        title="Add new note"
      />
      {!!noteCount && (
        <div className={classes.columnCards}>
          {noteOrder.map((noteId) => (
            <ColumnCard key={noteId} note={notes[noteId]} />
          ))}
        </div>
      )}
    </Box>
  );
};

export default ColumnBoard;
