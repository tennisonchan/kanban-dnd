import React, { useState } from "react";
import loadable from "@loadable/component";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
      <h2>{t("EmptyColumn.emptyColumn.h2")}</h2>
      <div>
        <Button variant="contained" onClick={handleOpen}>
          {t("EmptyColumn.Button.text")}
        </Button>
        <ColumnModal
          isOpen={isOpen}
          onClose={handleClose}
          onSubmit={handleCreateColumn}
          buttonText={t("EmptyColumn.ColumnModal.buttonText")}
          title={t("EmptyColumn.ColumnModal.title")}
        />
      </div>
    </div>
  );
};

export default EmptyColumn;
