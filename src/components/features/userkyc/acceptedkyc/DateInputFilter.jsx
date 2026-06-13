"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export default function DateInputFilter({ onSubmit }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleSubmit = () => {
    onSubmit?.({
      sdate: startDate ? format(startDate, "yyyy-MM-dd") : "",
      edate: endDate ? format(endDate, "yyyy-MM-dd") : "",
    });
  };

  return (
    <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <label className="mb-3 block text-sm font-semibold text-foreground">Start Date</label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-14 w-full justify-between rounded-2xl border-border bg-muted/40 px-5 text-sm font-medium text-foreground hover:bg-background"
              >
                {startDate ? format(startDate, "dd-MM-yyyy") : "dd-mm-yyyy"}

                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="w-auto rounded-3xl border border-border p-0 shadow-2xl"
            >
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="mb-3 block text-sm font-semibold text-foreground">End Date</label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-14 w-full justify-between rounded-2xl border-border bg-muted/40 px-5 text-sm font-medium text-foreground hover:bg-background"
              >
                {endDate ? format(endDate, "dd-MM-yyyy") : "dd-mm-yyyy"}

                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="w-auto rounded-3xl border border-border p-0 shadow-2xl"
            >
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSubmit}
          className="flex h-12 items-center justify-center rounded-2xl bg-primary px-8 text-sm font-semibold text-white transition-all hover:opacity-90"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
