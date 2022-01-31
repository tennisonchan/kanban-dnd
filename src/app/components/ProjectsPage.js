import React, { useEffect, useState } from "react";
import { useProjects, useAuth } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack-v5";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import NavBar from "app/components/NavBar";
import ProjectModal from "app/components/ProjectModal";
import ProjectCard from "app/components/ProjectCard";
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
  const [{ isAuthenticated }] = useAuth();
  const [{ projectList }, { fetchProjects, createProject }] = useProjects();
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleCreateProject = (project) => {
    createProject(project).then(() => {
      enqueueSnackbar(t("ProjectsPage.Snackbar.handleCreateProject.text"), {
        autoHideDuration: 3000,
        variant: "success",
      });
    });

    handleCloseModal();
  };

  return (
    <>
      <NavBar />
      <Box sx={{ padding: "24px" }}>
        <Grid container spacing={2}>
          {projectList.map((project) => (
            <Grid item key={project.id}>
              <ProjectCard projectId={project.id} project={project} />
            </Grid>
          ))}
          <Grid item>
            <Button
              onClick={handleOpenModal}
              className={classes.createProjectButton}
            >
              <span className={classes.createProjectButtonText}>
                {t("ProjectsPage.Button.createProjectButtonText")}
              </span>
            </Button>
            <ProjectModal
              title={t("ProjectsPage.ProjectModal.title")}
              isOpen={isOpenModal}
              onClose={handleCloseModal}
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
