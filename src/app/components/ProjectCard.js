import React, { useRef, useState } from "react";
import { useProject } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack-v5";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardActionArea } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ProjectModal from "app/components/ProjectModal";
import ProjectMenu from "app/components/ProjectMenu";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  createProjectButton: {
    // display: "flex",
    // height: "fit-content",
  },
}));

const ProjectCard = (props) => {
  const { project, projectId } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [, { editProject, removeProject }] = useProject();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const anchor = useRef(null);
  const [isOpenEditMenu, setIsOpenEditMenu] = useState(false);

  const handleClickOnPage = () => {
    navigate(`/projects/${projectId}`);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleEditProject = (project) => {
    console.log(project);
    editProject(project).then(() => {
      enqueueSnackbar(t("ProjectCard.Snackbar.handleEditProject.text"), {
        autoHideDuration: 3000,
        variant: "success",
      });
    });

    handleCloseModal();
  };
  const handleOpenEditMenu = (event) => {
    anchor.current = event.target;
    setIsOpenEditMenu(true);
  };

  const handleCloseEditMenu = () => {
    setIsOpenEditMenu(false);
  };

  const handleOpenProjectModal = () => {
    setIsOpenModal(true);
    handleCloseEditMenu();
  };

  const handleDeleteProject = () => {
    removeProject(projectId).then(() => {
      enqueueSnackbar(t("ProjectCard.Snackbar.handleDeleteProject.text"), {
        autoHideDuration: 3000,
        variant: "info",
      });
    });
    handleCloseEditMenu();
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={handleOpenEditMenu}>
              <MoreVertIcon className={classes.editColumnIcon} />
            </IconButton>
          }
          title={project.name}
          subheader={project.description}
        />
        <CardActionArea onClick={() => handleClickOnPage(project.id)}>
          <CardMedia
            component="img"
            height="200"
            image={`https://picsum.photos/345/200?grayscale&blur=2&random=${project.id}`}
            alt="project cover"
          />
        </CardActionArea>
      </Card>
      <ProjectMenu
        anchorEl={anchor.current}
        isOpen={isOpenEditMenu}
        onDelete={handleDeleteProject}
        onClose={handleCloseEditMenu}
        onEdit={handleOpenProjectModal}
      />
      <ProjectModal
        title={t("ProjectCard.ProjectModal.title")}
        project={project}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        onSubmit={handleEditProject}
        buttonText={t("ProjectCard.ProjectModal.buttonText")}
      />
    </>
  );
};

export default ProjectCard;
