import React, { useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NoteModal from "app/components/NoteModal";
import { useNotes } from "app/hooks";
import NoteMenu from "app/components/NoteMenu";
import { Draggable } from "react-beautiful-dnd";
import AdjustSharpIcon from "@mui/icons-material/AdjustSharp";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import Tooltip from "@mui/material/Tooltip";
import { isNoteOpenStatus } from "app/helpers";
import { NOTE_STATUE } from "app/constants";
import { useSnackbar } from "notistack-v5";

const useStyles = makeStyles((theme) => ({
  columnCard: {
    display: "flex",
    paddingLeft: theme.spacing(5),
    padding: theme.spacing(1),
    marginTop: "3px",
    marginBottom: theme.spacing(1),
    whiteSpace: "normal",
    borderRadius: theme.spacing(1),
    position: "relative",
    backgroundColor: "white",
    color: "#646c72",
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  },
  cardIcon: {
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    marginRight: theme.spacing(3),
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  editCardIconWrap: {
    alignItems: "center",
    display: "flex",
    minWidth: "40px",
  },
}));

const ColumnCard = (props) => {
  const classes = useStyles();
  const [isOpenNoteModal, setIsOpenNoteModal] = useState(false);
  const [, { editNote, removeNote, archiveNote }] = useNotes();
  const { note, columnId, index } = props;
  const anchor = useRef(null);
  const [isOpenNoteMenu, setIsOpenNoteMenu] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenNoteModal = () => {
    setIsOpenNoteModal(true);
  };

  const handleCloseNoteModal = () => {
    setIsOpenNoteModal(false);
  };

  const handleEditNote = (newNote) => {
    editNote(newNote).then(() => {
      enqueueSnackbar("You updated a note!", {
        autoHideDuration: 3000,
        variant: "info",
      });
    });
    handleCloseNoteModal();
  };

  const handleOpenNoteMenu = () => {
    setIsOpenNoteMenu(true);
  };
  const handleCloseNoteMenu = () => {
    setIsOpenNoteMenu(false);
  };
  const handleDeleteNote = () => {
    removeNote(note.id, columnId).then(() => {
      enqueueSnackbar("You removed a note!", {
        autoHideDuration: 3000,
        variant: "info",
      });
    });
  };
  const handleArchiveMenu = () => {
    archiveNote(note.id, columnId).then(() => {
      enqueueSnackbar("You archived a note!", {
        autoHideDuration: 3000,
        variant: "info",
      });
    });
  };
  const handleChangeStatus = (isOpenStatus) => {
    editNote({
      ...note,
      status: isOpenStatus ? NOTE_STATUE.OPEN : NOTE_STATUE.CLOSED,
    }).then(() => {
      enqueueSnackbar("You changed a note status!", {
        autoHideDuration: 3000,
        variant: "info",
      });
    });
    handleCloseNoteMenu();
  };

  return (
    <>
      <Draggable key={note.id} draggableId={note.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={classes.columnCard}
          >
            <div className={classes.cardIcon}>
              {isNoteOpenStatus(note.status) ? (
                <Tooltip title="Open issue">
                  <AdjustSharpIcon sx={{ color: "#09b43a" }} />
                </Tooltip>
              ) : (
                <Tooltip title="Closed issue">
                  <CheckCircleOutlineSharpIcon sx={{ color: "#651fff" }} />
                </Tooltip>
              )}
            </div>
            <div className={classes.cardContent}>
              <small>{note.name}</small>
              <div>{note.content}</div>
            </div>
            <div ref={anchor} className={classes.editCardIconWrap}>
              <IconButton onClick={handleOpenNoteMenu}>
                <MoreHorizIcon />
              </IconButton>
            </div>
          </div>
        )}
      </Draggable>
      <NoteMenu
        anchorEl={anchor.current}
        isOpen={isOpenNoteMenu}
        noteStatus={note.status}
        onDelete={handleDeleteNote}
        onClose={handleCloseNoteMenu}
        onEdit={handleOpenNoteModal}
        onArchive={handleArchiveMenu}
        onChangeStatus={handleChangeStatus}
      />
      <NoteModal
        isOpen={isOpenNoteModal}
        onClose={handleCloseNoteModal}
        onSubmit={handleEditNote}
        buttonText="Update"
        title={`Edit ${note.name}`}
        note={note}
      />
    </>
  );
};

export default ColumnCard;
