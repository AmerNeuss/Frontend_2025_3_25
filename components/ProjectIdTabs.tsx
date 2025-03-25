"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Layers,
  Settings,
  Share2,
  List,
  Database,
  ChartNoAxesCombined,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProjectIdTabsProps {
  projectId: number;
  projectName: string;
}

export default function ProjectIdTabs({
  projectId,
  projectName,
}: ProjectIdTabsProps) {
  const pathname = usePathname();

  const getDefaultValue = () => {
    if (pathname.includes("/connections")) return "connections";
    if (pathname.includes("/assignUser")) return "assign-users";
    if (pathname.includes("/settings")) return "settings";
    if (pathname.includes("/dataset") || pathname.includes("/addDataset")) {
      return "dataset";
    }
    if (pathname.includes("/chart") || pathname.includes("/addChart")) {
      return "chart";
    }
    return "project-details";
  };

  return (
    <div className="m-4">
      <Tabs defaultValue={getDefaultValue()}>
        <ScrollArea>
          <TabsList className="mb-3">
            {/* Project Details Tab */}
            <TabsTrigger value="project-details">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/Projects/${projectId}`}>
                    <div className="flex items-center">
                      <Layers
                        className="-ms-0.5 me-1.5 opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                      Project Details
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Go to details for {projectName}</TooltipContent>
              </Tooltip>
            </TabsTrigger>

            {/* Assign Users Tab */}
            <TabsTrigger value="assign-users">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/Projects/${projectId}/assignUser/${projectName}`}
                  >
                    <div className="flex items-center">
                      <List
                        className="-ms-0.5 me-1.5 opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                      Assign Users
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  Go to Assign Users for {projectName}
                </TooltipContent>
              </Tooltip>
            </TabsTrigger>

            {/* Connections Tab */}
            <TabsTrigger value="connections">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/Projects/${projectId}/connections/${projectName}`}
                  >
                    <div className="flex items-center">
                      <Share2
                        className="-ms-0.5 me-1.5 opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                      Connections
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  Go to Connections for {projectName}
                </TooltipContent>
              </Tooltip>
            </TabsTrigger>

            {/* Settings Tab */}
            <TabsTrigger value="settings">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/Projects/${projectId}/settings/${projectName}`}>
                    <div className="flex items-center">
                      <Settings
                        className="-ms-0.5 me-1.5 opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                      Settings
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  Go to Settings for {projectName}
                </TooltipContent>
              </Tooltip>
            </TabsTrigger>

            {/* Dataset Tab */}
            <TabsTrigger value="dataset">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/Projects/${projectId}/dataset/${projectName}`}>
                    <div className="flex items-center">
                      <Database
                        className="-ms-0.5 me-1.5 opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                      Dataset
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Go to Dataset for {projectName}</TooltipContent>
              </Tooltip>
            </TabsTrigger>

            {/* Chart Tab */}
            <TabsTrigger value="chart">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/Projects/${projectId}/chart/${projectName}`}>
                    <div className="flex items-center">
                      <ChartNoAxesCombined
                        className="-ms-0.5 me-1.5 opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                      Chart
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Go to Chart for {projectName}</TooltipContent>
              </Tooltip>
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Tabs>
    </div>
  );
}