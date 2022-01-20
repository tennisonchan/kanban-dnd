import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddColumnModal from "app/components/AddColumnModal";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  emptyColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const EmptyColumn = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCreateColumn = (columnName) => {
    handleClose();
  };

  return (
    <div className={classes.emptyColumn}>
      <h2>This project doesn’t have any columns or cards.</h2>
      <div>
        <Button variant="contained" onClick={handleOpen}>
          Add a column
        </Button>
        <AddColumnModal
          isOpen={isOpen}
          onClose={handleClose}
          onSubmit={handleCreateColumn}
        />
      </div>
    </div>
  );
};

export default EmptyColumn;
