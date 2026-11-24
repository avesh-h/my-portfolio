// DetailedProjectPageWrapper.js

import React from "react";
import { useParams } from "react-router-dom";
import DetailedProjectPage from "./DetailedProjectPage";
import DetailShell, { Paragraph } from "../components/DetailShell";
import { projectsContent } from "../static/projectsData.js";
import { WebsiteProjectDetail } from "../components/site/DetailPages";
import { getMode } from "../utils/mode";

const TerminalProjectDetail = () => {
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

// Website mode (default) gets the polished page; terminal mode keeps the shell.
const DetailedProjectPageWrapper = () =>
  getMode() === "website" ? <WebsiteProjectDetail /> : <TerminalProjectDetail />;

export default DetailedProjectPageWrapper;
