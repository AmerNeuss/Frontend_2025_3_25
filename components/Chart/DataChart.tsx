"use client";
import React, { useEffect, useId, useState } from "react";
import { ChevronDownIcon,  Hash, CaseUpper, Clock, Braces } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import { Input } from "../ui/input";
import { Dataset } from "@/types";
import { Label } from "../ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"; // استيراد Tooltip

export default function DataChart() {
  const id = useId();

  const [databases, setDataset] = useState<Dataset[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDataset, setSelectedDataset] = useState<number | null>(null);
  const [fieldsAndTypes, setFieldsAndTypes] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    fetch("https://localhost:7219/api/DS")
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server error: ${errorText}`);
        }
        return response.json();
      })
      .then((data: Dataset[]) => setDataset(data))
      .catch((error) => {
        console.error("Error fetching dataset:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedDataset) {
      fetch(`https://localhost:7219/api/DS/${selectedDataset}`)
        .then(async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${errorText}`);
          }
          return response.json();
        })
        .then((data: Dataset) => {
          setFieldsAndTypes(data.fieldsAndTypes);
        })
        .catch((error) => {
          console.error("Error fetching columns:", error);
        });
    }
  }, [selectedDataset]);

  const getIconForType = (type: string) => {
    if (type.includes("integer") || type.includes("real") || type.includes("id")) {
      return <Hash size={16} className="text-muted-foreground" />;
    } else if (type.includes("character varying") || type.includes("string")) {
      return <CaseUpper size={16} className="text-muted-foreground" />;
    } else if (type.includes("timestamp")) {
      return <Clock size={16} className="text-muted-foreground" />;
    }
    else if (type.includes("json")) {
      return <Braces size={16} className="text-muted-foreground" />;
    }
    
    return null;
  };

  return (
    <>
      {/* <div className="flex items-center">
        {" "}
        <div className="w-14 flex-initial ">
          <Grid3X3 size={28} strokeWidth={1.5} absoluteStrokeWidth />
        </div>
        <div className="w-64 flex-initial">
          <Input />
        </div>
        <div className="w-14 flex-initial ">
          <EllipsisVertical
            size={28}
            strokeWidth={1.5}
            absoluteStrokeWidth
            className="ml-auto"
          />
        </div>
      </div> */}

      <div className="*:not-first:mt-2">
        <Label htmlFor={id}>Dataset</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
            >
              {selectedDataset ? (
                <span className="flex min-w-0 items-center gap-2">
                  <span className="truncate">
                    {
                      databases.find(
                        (item) => item.id === selectedDataset
                      )?.name
                    }
                  </span>
                </span>
              ) : (
                <span className="text-muted-foreground">Select dataset</span>
              )}
              <ChevronDownIcon
                size={16}
                className="text-muted-foreground/80 shrink-0"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
            align="start"
          >
            {/* <Command>
              <CommandInput placeholder="Search databases..." />
              <CommandList>
                <CommandEmpty>No dataset found.</CommandEmpty>
                <CommandGroup>
                  {databases.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.id.toString()}
                      onSelect={(currentValue: string) => {
                        setSelectedDataset(Number(currentValue));
                        setOpen(false);
                      }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">{item.name}</div>
                      <span className="text-muted-foreground text-xs">
                        {item.id.toLocaleString()}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command> */}
          </PopoverContent>
        </Popover>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-2">
          <AccordionTrigger>Columns</AccordionTrigger>
          <AccordionContent>
            {fieldsAndTypes ? (
              <div className="space-y-2">
                {Object.entries(fieldsAndTypes).map(([field, type]) => (
                  <div key={field} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tooltip> 
                        <TooltipTrigger>
                          {getIconForType(type)} 
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Type :{type}</p> 
                        </TooltipContent>
                      </Tooltip>
                      <span>{field}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">No columns selected.</span>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}