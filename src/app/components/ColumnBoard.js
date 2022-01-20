import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddColumnModal from "app/components/AddColumnModal";
import { makeStyles } from "@mui/styles";
import NotesIcon from "@mui/icons-material/Notes";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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
  columnName: {
    display: "inline-block",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    margin: 0,
  },
  counter: {
    display: "inline-block",
    minWidth: "20px",
    padding: "0 6px",
    fontSize: "12px",
    fontWeight: "700",
    lineHeight: "18px",
    color: theme.palette.primary.contrastText,
    textAlign: "center",
    backgroundColor: theme.palette.secondary.contrastText,
    borderRadius: "2em",
  },
  columnHeader: {
    padding: theme.spacing(1),
  },
  columnCards: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
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
  },
  editNoteIconWrap: {
    alignItems: "center",
    display: "flex",
  },
  editNoteIcon: {
    color: theme.palette.primary.contrastText,
  },
}));

const ColumnBoardHeader = (props) => {
  const { columnName, noteCount } = props;
  const classes = useStyles();

  return (
    <div className={classes.columnHeader}>
      <span className={classes.counter}>{noteCount}</span>
      <h3 className={classes.columnName}>{columnName}</h3>
    </div>
  );
};

const NoteForm = (props) => {
  return <div>note form</div>;
};

const ColumnCard = (props) => {
  const classes = useStyles();
  const { note } = props;
  console.log({ note });
  return (
    <div className={classes.columnCard}>
      <NotesIcon className={classes.cardIcon} />
      <div className={classes.cardContent}>
        <div>{note.content}</div>
        <small>Added by tennisonchan</small>
      </div>
      <div className={classes.editNoteIconWrap}>
        <IconButton>
          <MoreHorizIcon className={classes.editNoteIcon} />
        </IconButton>
      </div>
    </div>
  );
};

const ColumnBoard = (props) => {
  const { column } = props;
  const { name, notes = {}, noteOrder = [] } = column;
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const noteCount = noteOrder.length;

  return (
    <Box className={classes.columnBoard}>
      <ColumnBoardHeader columnName={name} noteCount={noteCount} />
      {isAddingNote && <NoteForm />}
      <div className={classes.columnCards}>
        {noteOrder.map((noteId) => (
          <ColumnCard key={noteId} note={notes[noteId]} />
        ))}
      </div>
    </Box>
  );
};

export default ColumnBoard;
