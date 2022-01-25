import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

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
  return (
    <div className={classes.pageNotFound}>
      <Typography align="center" sx={{ fontWeight: "bold" }} variant="h2">
        404 - Not Found!
      </Typography>
      <Link to="/projects">Project page</Link>
    </div>
  );
};

export default NotFound;
