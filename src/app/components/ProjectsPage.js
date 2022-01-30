import React, { useEffect, useState } from "react";
import { useProjects, useAuth } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack-v5";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";
import { makeStyles } from "@mui/styles";
import NavBar from "app/components/NavBar";
import ProjectModal from "app/components/ProjectModal";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  createProjectButton: {
    // display: "flex",
    // height: "fit-content",
  },
}));

const ProjectPage = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [{ accessToken, isAuthenticated }] = useAuth();
  const [{ projectList }, { fetchProjects, createProject }] = useProjects();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("ProjectPage", { accessToken, isAuthenticated });
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log({ projectList });
  const handleClickOnPage = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCreateProject = (project) => {
    createProject(project).then(() => {
      enqueueSnackbar(t("ProjectsPage.Snackbar.handleCreateProject.text"), {
        autoHideDuration: 3000,
        variant: "success",
      });
    });

    handleClose();
  };

  return (
    <>
      <NavBar />
      <Box sx={{ padding: "24px" }}>
        <Grid container spacing={2}>
          {projectList.map((project) => (
            <Grid item key={project.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => handleClickOnPage(project.id)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`https://picsum.photos/345/200?grayscale&blur=2&random=${project.id}`}
                    alt="project cover"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
          <Grid item>
            <Button
              onClick={handleOpen}
              className={classes.createProjectButton}
            >
              <span className={classes.createProjectButtonText}>
                {t("ProjectsPage.Button.createProjectButtonText")}
              </span>
            </Button>
            <ProjectModal
              title={t("ProjectsPage.ProjectModal.title")}
              isOpen={isOpen}
              onClose={handleClose}
              onSubmit={handleCreateProject}
              buttonText={t("ProjectsPage.ProjectModal.buttonText")}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProjectPage;
