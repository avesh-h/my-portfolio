import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

const ProjectDetailPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: "Project 1",
      description:
        "Frontend Developer with expertise in React.js and modern web development technologies. I love building user-friendly and visually appealing web applications.",
    },
    {
      id: 2,
      name: "Project 2",
      description:
        "Frontend Developer with expertise in React.js and modern web development technologies. I love building user-friendly and visually appealing web applications.This is the detail of Project 2.",
    },
    {
      id: 3,
      name: "Project 3",
      description:
        "Frontend Developer with expertise in React.js and modern web development technologies. I love building user-friendly and visually appealing web applications.This is the detail of Project 3.",
    },
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  return (
    <div>
      <List>
        {projects.map((project) => (
          <ListItem
            key={project.id}
            button
            onClick={() => handleProjectClick(project)}
          >
            <ListItemText style={{ color: "white" }} primary={project.name} />
          </ListItem>
        ))}
      </List>

      <Dialog open={selectedProject !== null} onClose={handleClose}>
        {selectedProject && (
          <>
            <DialogTitle>{selectedProject.name}</DialogTitle>
            <DialogContent>
              <Typography>{selectedProject.description}</Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default ProjectDetailPage;
