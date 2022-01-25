import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  pageNotFound: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

const NotFound = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.pageNotFound}>
      <Typography align="center" sx={{ fontWeight: "bold" }} variant="h2">
        {t("NotFound.Typography.h2")}
      </Typography>
      <Link to="/projects">{t("NotFound.Link.text")}</Link>
    </div>
  );
};

export default NotFound;
