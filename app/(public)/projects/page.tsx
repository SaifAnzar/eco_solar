import React from "react";
import ProjectsGallery from "@/components/projects/ProjectsGallery";
import { getLocalProjects } from "@/lib/get-local-projects";

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  const projects = getLocalProjects();

  return <ProjectsGallery initialProjects={projects} />;
}
