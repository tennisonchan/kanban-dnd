import React, { useState, useRef } from "react";
import { makeStyles } from "@mui/styles";
import ColumnBoardHeader from "app/components/ColumnBoardHeader";
import ColumnCard from "app/components/ColumnCard";
import { useColumns, useNotes } from "app/hooks";
import EditColumnMenu from "app/components/EditColumnMenu";
import ColumnModal from "app/components/ColumnModal";
import NoteModal from "app/components/NoteModal";
import { useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSnackbar } from "notistack-v5";

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
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
  },
  columnCards: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const ColumnBoard = (props) => {
  const classes = useStyles();
  const { columnId, index } = props;
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
  const { enqueueSnackbar } = useSnackbar();
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
    addNote(note, columnId).then(() => {
      enqueueSnackbar("You added a new note!", {
        autoHideDuration: 3000,
        variant: "success",
      });
    });
  };
  const handleCloseEditMenu = () => {
    setIsOpenEditMenu(false);
  };
  const handleDeleteColumn = () => {
    removeColumn(columnId).then(() => {
      enqueueSnackbar("You added a new note!", {
        autoHideDuration: 3000,
        variant: "info",
      });
    });
    handleCloseEditMenu();
  };
  const handleOpenColumnModel = () => {
    setIsOpenColumnModal(true);
  };

  const handleCloseColumnModal = () => {
    setIsOpenColumnModal(false);
  };
  const handleEditColumn = (column) => {
    editColumn(column).then(() => {
      enqueueSnackbar("Columns is updated!", {
        autoHideDuration: 3000,
        variant: "info",
      });
    });
    handleCloseColumnModal();
  };

  return (
    <Draggable key={columnId} draggableId={columnId} index={index}>
      {(draggableProvided) => (
        <div
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          className={classes.columnBoard}
        >
          <ColumnBoardHeader
            ref={anchor}
            columnId={columnId}
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
            buttonText="Add note"
            title="Add new note"
          />
          {!!noteCount && (
            <Droppable droppableId={columnId} type="NOTE" direction="vertical">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classes.columnCards}
                >
                  {noteOrder.map((noteId, index) => (
                    <ColumnCard
                      key={noteId}
                      index={index}
                      note={notes[noteId]}
                      columnId={columnId}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default ColumnBoard;
