import React, { useEffect } from "react";
import { useProjects } from "app/hooks";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ProjectPage = (props) => {
  const navigate = useNavigate();
  const [{ projectList }, { fetchProjects }] = useProjects();

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log({ projectList });
  const handleClickOnPage = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <Box sx={{ padding: "24px" }}>
      <Container>
        {projectList.map((project) => (
          <Card key={project.id} sx={{ maxWidth: 345 }}>
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
        ))}
      </Container>
    </Box>
  );
};

export default ProjectPage;
