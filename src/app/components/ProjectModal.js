import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

const ProjectModal = (props) => {
  const { t } = useTranslation();
  const {
    title = t("ProjectModal.title"),
    project = {},
    buttonText = t("ProjectModal.buttonText"),
    isOpen,
    onClose,
    onSubmit,
  } = props;
  const [projectName, setProjectName] = useState(project?.name || "");
  const noInputValue = !projectName;
  const handleChange = (event) => {
    setProjectName(event.target.value);
  };
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    onSubmit({ ...project, name: projectName });
    setProjectName("");
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      event.preventDefault();
      onSubmit({ ...project, name: projectName });
    }
  };

  useEffect(() => {
    setProjectName(project?.name);
  }, [project?.name]);

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
          label={t("ProjectModal.TextField.label")}
          placeholder={t("ProjectModal.TextField.placeholder")}
          value={projectName}
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

export default ProjectModal;
