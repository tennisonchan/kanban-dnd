import React, { useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import NotesIcon from "@mui/icons-material/Notes";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NoteModal from "app/components/NoteModal";
import { useNotes } from "app/hooks";
import NoteMenu from "app/components/NoteMenu";

const useStyles = makeStyles((theme) => ({
  columnCard: {
    display: "flex",
    paddingLeft: theme.spacing(5),
    padding: theme.spacing(1),
    marginTop: "3px",
    marginBottom: theme.spacing(1),
    whiteSpace: "normal",
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.contrastText}`,
    position: "relative",
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
  const [, { editNote, removeNote }] = useNotes();
  const { note, columnId } = props;
  const anchor = useRef(null);
  console.log({ note });
  const [isOpenNoteMenu, setIsOpenNoteMenu] = useState(false);

  const handleOpenNoteModal = () => {
    setIsOpenNoteModal(true);
  };

  const handleCloseNoteModal = () => {
    setIsOpenNoteModal(false);
  };

  const handleEditNote = (note) => {
    editNote(note);
    handleCloseNoteModal();
  };

  const handleOpenNoteMenu = () => {
    setIsOpenNoteMenu(true);
  };
  const handleCloseNoteMenu = () => {
    setIsOpenNoteMenu(false);
  };
  const handleDeleteNote = () => {
    removeNote(note.id, columnId);
  };

  return (
    <>
      <div className={classes.columnCard}>
        <NotesIcon className={classes.cardIcon} />
        <div className={classes.cardContent}>
          <small>{note.name}</small>
          <div>{note.content}</div>
        </div>
        <div ref={anchor} className={classes.editCardIconWrap}>
          <IconButton onClick={handleOpenNoteMenu}>
            <MoreHorizIcon sx={{ color: "primary.contrastText" }} />
          </IconButton>
        </div>
      </div>
      <NoteMenu
        anchorEl={anchor.current}
        isOpen={isOpenNoteMenu}
        onDelete={handleDeleteNote}
        onClose={handleCloseNoteMenu}
        onEdit={handleOpenNoteModal}
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
