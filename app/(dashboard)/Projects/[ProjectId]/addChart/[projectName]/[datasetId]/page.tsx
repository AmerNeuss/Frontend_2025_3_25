import React, { Suspense } from "react";
import Loading from "@/app/loading";
import ProjectIdTabs from "@/components/ProjectIdTabs";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import ChooseChart from "@/components/Chart/ChooseChart";
import ChartWithDSId from "@/components/Chart/ChartWithDSId";

export default async function AddChartWithDSId({
  params,
}: {
  params: Promise<{
    ProjectId: number;
    projectName: string;
    datasetId: number;
  }>;
}) {
  const ProjectId = (await params).ProjectId;
  const projectName = (await params).projectName;
  const datasetId = (await params).datasetId;

  return (
    <Suspense fallback={<Loading />}>
      <ProjectIdTabs projectName={projectName} projectId={ProjectId} />
      <Label className="font-bold ml-4 my-2">Chart</Label>
      <Input
        type="text"
        placeholder="Chart name"
        className="border-none ml-4"
      />
      <Separator className="my-4 bg-custom-green2" />

      <div className="flex flex-row ">
        <div className="basis-64">
          <ChartWithDSId datasetId={datasetId} />
        </div>

        <Separator
          orientation="vertical"
          className="mx-4 h-auto bg-custom-green2"
        />
        <div className="basis-64">
          <ChooseChart />
        </div>
        <Separator
          orientation="vertical"
          className="mx-4 h-auto bg-custom-green2"
        />
        <div className="basis-128">03</div>
      </div>
    </Suspense>
  );
}
