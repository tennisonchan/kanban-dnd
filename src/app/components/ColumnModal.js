import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const ColumnModal = (props) => {
  const {
    title = "Add a column",
    column = {},
    buttonText = "Create column",
    isOpen,
    onClose,
    onSubmit,
  } = props;
  const [columnName, setColumnName] = useState(column?.name || "");
  const noInputValue = !columnName;
  const handleChange = (event) => {
    setColumnName(event.target.value);
  };
  const handleClose = () => {
    onClose();
    setColumnName("");
  };

  const handleSubmit = () => {
    onSubmit({ ...column, name: columnName });
  };

  const handleKeyPress = (event) => {
    if (event.charCode == 13) {
      event.preventDefault();
      console.log("value", event.target.value);
      onSubmit({ ...column, name: columnName });
    }
  };

  useEffect(() => {
    setColumnName(column?.name);
  }, [column?.name]);

  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      aria-labelledby="modal-title"
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="modal-title" onClose={handleClose}>
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          required
          fullWidth
          id="outlined-required"
          label="Column name"
          placeholder="Enter a column name (To Do, In Progress, Done)"
          value={columnName}
          onChange={handleChange}
          autoFocus
          onKeyPress={handleKeyPress}
        />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          variant="contained"
          disabled={noInputValue}
          onClick={handleSubmit}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColumnModal;
