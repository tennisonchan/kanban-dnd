import React, { useEffect } from "react";
import { useProjects, useAuth } from "app/hooks";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import NavBar from "app/components/NavBar";

const ProjectPage = (props) => {
  const navigate = useNavigate();
  const [{ accessToken, isAuthenticated }] = useAuth();
  const [{ projectList }, { fetchProjects }] = useProjects();

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
                    image="https://picsum.photos/345/200?grayscale&blur=2"
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
        </Grid>
      </Box>
    </>
  );
};

export default ProjectPage;
