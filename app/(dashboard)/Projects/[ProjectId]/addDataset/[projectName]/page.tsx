import React, { Suspense } from "react";
import Loading from "@/app/loading";
import ProjectIdTabs from "@/components/ProjectIdTabs";
import DatabaseSelect from "@/components/Dataset/DatabaseSelect";

import { Label } from "@radix-ui/react-dropdown-menu";
import { Projects } from "@/types";
async function getProjectById(id: number): Promise<Projects> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/DB/project/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export default async function Dataset({
  params,
}: {
  params: Promise<{
    ProjectId: number;
    projectName: string;
    projectData: Projects;
  }>;
}) {
  const ProjectId = (await params).ProjectId;
  const projectName = (await params).projectName;

  const project = await getProjectById(ProjectId);
  console.log("projectData:", project);
  return (
    <Suspense fallback={<Loading />}>
      <ProjectIdTabs  projectName={projectName} projectId={ProjectId} />
      <Label className="font-bold ml-4 my-2">New Dataset </Label>

      <DatabaseSelect ProjectId={ProjectId} projectName={projectName} />
    </Suspense>
  );
}
