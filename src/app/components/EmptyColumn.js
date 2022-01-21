import React, { useState } from "react";
import loadable from "@loadable/component";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const ColumnModal = loadable(() => import("app/components/ColumnModal"));

const useStyles = makeStyles((theme) => ({
  emptyColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
}));

const EmptyColumn = (props) => {
  const { onSubmit } = props;
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCreateColumn = (column) => {
    onSubmit(column);
    handleClose();
  };

  return (
    <div className={classes.emptyColumn}>
      <h2>This project doesn’t have any columns or cards.</h2>
      <div>
        <Button variant="contained" onClick={handleOpen}>
          Add a column
        </Button>
        <ColumnModal
          isOpen={isOpen}
          onClose={handleClose}
          onSubmit={handleCreateColumn}
          buttonText="Create column"
          title="Add a column"
        />
      </div>
    </div>
  );
};

export default EmptyColumn;
