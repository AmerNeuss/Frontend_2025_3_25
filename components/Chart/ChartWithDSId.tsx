"use client";
import React, { useEffect, useState } from "react";
import { Hash, CaseUpper, Clock, Braces } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "../ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dataset } from "@/types";

export default function ChartWithDSId({ datasetId }: { datasetId: number }) {
  const [datasetDetails, setDatasetDetails] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch dataset details when datasetId changes
  useEffect(() => {
    if (datasetId) {
      setLoading(true);
      fetch(`https://localhost:7219/api/DS/${datasetId}`)
        .then(async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${errorText}`);
          }
          return response.json();
        })
        .then((data: Dataset) => {
          setDatasetDetails(data); // Store the entire dataset response
          setError(null);
        })
        .catch((error) => {
          console.error("Error fetching dataset details:", error);
          setError(error.message);
        })
        .finally(() => setLoading(false));
    }
  }, [datasetId]);

  const getIconForType = (type: string) => {
    if (
      type.includes("integer") ||
      type.includes("real") ||
      type.includes("id")
    ) {
      return <Hash size={16} className="text-muted-foreground" />;
    } else if (type.includes("character varying") || type.includes("string")) {
      return <CaseUpper size={16} className="text-muted-foreground" />;
    } else if (type.includes("timestamp")) {
      return <Clock size={16} className="text-muted-foreground" />;
    } else if (type.includes("json")) {
      return <Braces size={16} className="text-muted-foreground" />;
    }
    return null;
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Dataset Name */}
      <div className="*:not-first:mt-2">
        <Label>Dataset</Label>
        <div className="bg-background border-input p-3 rounded-md">
          {datasetDetails && (
            <>
              <p>Name: {datasetDetails.name}</p>
              {/* Add more fields as needed */}
            </>
          )}
        </div>
      </div>

      {/* Dataset Columns */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-2">
          <AccordionTrigger>Columns</AccordionTrigger>
          <AccordionContent>
            {datasetDetails?.fieldsAndTypes ? (
              <div className="space-y-2">
                {Object.entries(datasetDetails.fieldsAndTypes).map(
                  ([field, type]) => (
                    <div
                      key={field}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger>
                            {getIconForType(type)}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Type: {type}</p>
                          </TooltipContent>
                        </Tooltip>
                        <span>{field}</span>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <span className="text-muted-foreground">
                No columns selected.
              </span>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
