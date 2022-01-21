import React from "react";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import NotesIcon from "@mui/icons-material/Notes";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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
  const { note } = props;
  return (
    <div className={classes.columnCard}>
      <NotesIcon className={classes.cardIcon} />
      <div className={classes.cardContent}>
        <small>{note.name}</small>
        <div>{note.content}</div>
      </div>
      <div className={classes.editCardIconWrap}>
        <IconButton>
          <MoreHorizIcon sx={{ color: "primary.contrastText" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default ColumnCard;
