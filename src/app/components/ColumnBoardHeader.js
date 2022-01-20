import React from "react";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles((theme) => ({
  columnName: {
    display: "inline-block",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    margin: 0,
    flexGrow: 1,
  },
  counter: {
    display: "inline-block",
    minWidth: "20px",
    padding: "0 6px",
    fontSize: "12px",
    fontWeight: "700",
    height: "20px",
    color: theme.palette.primary.contrastText,
    textAlign: "center",
    backgroundColor: theme.palette.secondary.contrastText,
    borderRadius: "2em",
  },
  columnHeader: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  addNoteIcon: {
    color: theme.palette.primary.contrastText,
  },
  editColumnIcon: {
    color: theme.palette.primary.contrastText,
  },
}));

const ColumnBoardHeader = (props) => {
  const { columnName, noteCount, onCreate, onEdit } = props;
  const classes = useStyles();

  return (
    <div className={classes.columnHeader}>
      <span className={classes.counter}>{noteCount}</span>
      <h3 className={classes.columnName}>{columnName}</h3>
      <div>
        <IconButton onClick={onCreate}>
          <AddIcon className={classes.addNoteIcon} />
        </IconButton>
        <IconButton onClick={onEdit}>
          <MoreHorizIcon className={classes.editColumnIcon} />
        </IconButton>
      </div>
    </div>
  );
};

export default ColumnBoardHeader;
