"use client";

import { ChevronDown, Copy, FileDown, FileSpreadsheet, Printer } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ExportDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex h-11 items-center gap-2 rounded-2xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-all hover:bg-muted">
          Export
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="z-[999] w-48 rounded-2xl border border-border bg-white p-2 shadow-2xl"
      >
        <DropdownMenuItem className="rounded-xl py-2.5 text-sm font-medium">
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </DropdownMenuItem>

        <DropdownMenuItem className="rounded-xl py-2.5 text-sm font-medium">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          CSV
        </DropdownMenuItem>

        <DropdownMenuItem className="rounded-xl py-2.5 text-sm font-medium">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Excel
        </DropdownMenuItem>

        <DropdownMenuItem className="rounded-xl py-2.5 text-sm font-medium">
          <FileDown className="mr-2 h-4 w-4" />
          PDF
        </DropdownMenuItem>

        <DropdownMenuItem className="rounded-xl py-2.5 text-sm font-medium">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
