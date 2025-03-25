import React, { useId } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChartItems } from "@/lib/ConnectionsData";

export default function ChooseChart() {
  const id = useId();

  return (
    <div>
      <Tabs defaultValue="data">
        <TabsList className="flex w-full">
          <TabsTrigger value="data" className="flex-1 text-center">
            Data
          </TabsTrigger>
          <TabsTrigger value="customize" className="flex-1 text-center">
            Customize
          </TabsTrigger>
        </TabsList>
        <TabsContent value="data" className="py-3">
          <div className="group relative">
            <label
              htmlFor={id}
              className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
            >
              Chart type
            </label>
            <Select>
              <SelectTrigger id={id}>
                <SelectValue placeholder="Select framework" />
              </SelectTrigger>
              <SelectContent>
                {ChartItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    <div className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      {item.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="customize">Change your Customize here.</TabsContent>
      </Tabs>
    </div>
  );
}
