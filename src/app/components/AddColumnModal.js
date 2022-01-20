import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const AddColumnModal = (props) => {
  const { isOpen, onClose, onSubmit } = props;
  const [columnName, setColumnName] = useState("");
  const noInputValue = !columnName;
  const handleChange = (event) => {
    setColumnName(event.target.value);
  };
  const handleClose = () => {
    onClose();
    setColumnName("");
  };

  const handleSubmit = () => {
    onSubmit(columnName);
  };

  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      aria-labelledby="modal-title"
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="modal-title" onClose={handleClose}>
        Add a column
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
        />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          variant="contained"
          disabled={noInputValue}
          onClick={handleSubmit}
        >
          Create Column
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddColumnModal;
