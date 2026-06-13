"use client";

import DataTable from "@/components/common/tables/DataTable";
import ExportDropdown from "@/components/common/tables/ExportDropdown";
import TableFooter from "@/components/common/tables/TableFooter";
import TableSearch from "@/components/common/tables/TableSearch";
import TableWrapper from "@/components/common/tables/TableWrapper";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";

const tableHeaders = [
  { label: "S.No", key: "id" },
  { label: "MT5 Account No", key: "mt5Account" },
  { label: "Reg Date Time", key: "regDate" },
  { label: "Leverage", key: "leverage" },
  { label: "Action", key: "action" },
];

const dummyData = [
  {
    id: 1,
    mt5Account: "MT50001",
    regDate: "12-06-2025 10:30 AM",
    leverage: "1:100",
  },
  {
    id: 2,
    mt5Account: "MT50002",
    regDate: "13-06-2025 02:10 PM",
    leverage: "1:200",
  },
];

export default function Leverage() {
  const handleUpdate = row => {
    console.log("Update leverage for:", row);
    // later: open modal / API call
  };

  return (
    <TableWrapper
      title="Leverage Management"
      description="Update MT5 account leverage settings"
      actions={
        <>
          <TableSearch />
          <ExportDropdown />
        </>
      }
      footer={<TableFooter />}
    >
      <DataTable headers={tableHeaders}>
        {dummyData.map(row => (
          <TableRow key={row.id} className="border-b border-border hover:bg-muted/40">
            {/* SR NO */}
            <TableCell>{row.id}</TableCell>

            {/* MT5 ACCOUNT */}
            <TableCell className="font-medium">{row.mt5Account}</TableCell>

            {/* REG DATE */}
            <TableCell className="whitespace-nowrap text-muted-foreground">{row.regDate}</TableCell>

            {/* LEVERAGE */}
            <TableCell>
              <span className="rounded-xl bg-blue-500/10 px-3 py-1 text-blue-600 text-xs font-semibold">
                {row.leverage}
              </span>
            </TableCell>

            {/* ACTION */}
            <TableCell>
              <button
                onClick={() => handleUpdate(row)}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-primary/10
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-primary
                  transition-all
                  hover:bg-primary/15
                  hover:scale-[1.02]
                "
              >
                <Pencil className="h-4 w-4" />
                Update
              </button>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </TableWrapper>
  );
}
