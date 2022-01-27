import React, { useState, useRef } from "react";
import loadable from "@loadable/component";
import { makeStyles } from "@mui/styles";
import { useColumns, useNotes } from "app/hooks";
import { selectColumnById, selectNoteOrderByColumnId } from "app/selectors";
import { useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSnackbar } from "notistack-v5";
import { useTranslation } from "react-i18next";

const ColumnBoardHeader = loadable(() =>
  import("app/components/ColumnBoardHeader")
);
const ColumnCard = loadable(() => import("app/components/ColumnCard"));
const ColumnModal = loadable(() => import("app/components/ColumnModal"));
const EditColumnMenu = loadable(() => import("app/components/EditColumnMenu"));
const NoteModal = loadable(() => import("app/components/NoteModal"));

const useStyles = makeStyles((theme) => ({
  columnBoard: {
    width: "calc(100vw - 32px)",
    maxWidth: "320px",
    borderWidth: "1px",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "column",
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
  },
  columnBoardMQ: {
    minWidth: "calc(100vw - 32px)",
  },
  columnCards: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const ColumnBoard = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { projectId, columnId, index } = props;
  const [{ notes }, { addNote }] = useNotes(projectId, columnId);
  const [, { removeColumn, editColumn }] = useColumns(projectId);
  const column = useSelector((state) =>
    selectColumnById(state, projectId, columnId)
  );
  const noteOrder = useSelector((state) =>
    selectNoteOrderByColumnId(state, projectId, columnId)
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
      enqueueSnackbar(t("ColumnBoard.Snackbar.handleCreateNote.text"), {
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
      enqueueSnackbar(t("ColumnBoard.Snackbar.handleDeleteColumn.text"), {
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
      enqueueSnackbar(t("ColumnBoard.Snackbar.handleEditColumn.text"), {
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
            buttonText={t("ColumnBoard.ColumnModal.buttonText")}
            title={t("ColumnBoard.ColumnModal.title")}
          />
          <NoteModal
            isOpen={isOpenNoteModal}
            onClose={handleCloseNoteModal}
            onSubmit={handleCreateNote}
            buttonText={t("ColumnBoard.NoteModal.buttonText")}
            title={t("ColumnBoard.NoteModal.title")}
          />
          <Droppable droppableId={columnId} type="NOTE" direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={classes.columnCards}
              >
                {noteOrder?.map((noteId, index) => (
                  <ColumnCard
                    key={noteId}
                    index={index}
                    projectId={projectId}
                    note={notes[noteId]}
                    columnId={columnId}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default ColumnBoard;
