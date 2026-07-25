// DetailedProjectPageWrapper.js

import React from "react";
import { useParams } from "react-router-dom";
import DetailedProjectPage from "./DetailedProjectPage";
import DetailShell, { Paragraph } from "../components/DetailShell";
import { projectsContent } from "../static/projectsData.js";

const DetailedProjectPageWrapper = () => {
  const { projectId } = useParams();
  const project = projectsContent?.projects?.find(
    (p) => p.id === parseInt(projectId, 10)
  );

  if (!project) {
    return (
      <DetailShell
        pathLabel="~/projects"
        command={`open projects/${projectId}`}
        sections={[
          <Paragraph>
            <span style={{ color: "#FF6B6B" }}>not found:</span> no project with
            that id.
          </Paragraph>,
        ]}
      />
    );
  }

  return <DetailedProjectPage project={project} />;
};

export default DetailedProjectPageWrapper;
