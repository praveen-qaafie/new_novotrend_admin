"use client";

import DataTable from "@/components/common/tables/DataTable";
import ExportDropdown from "@/components/common/tables/ExportDropdown";
import TableFooter from "@/components/common/tables/TableFooter";
import TableSearch from "@/components/common/tables/TableSearch";
import TableWrapper from "@/components/common/tables/TableWrapper";
import { TableCell, TableRow } from "@/components/ui/table";
import { useClientPagination } from "@/hooks/useClientPagination";

const tableHeaders = [
  { label: "S.No", key: "id" },
  { label: "MT5 Account No", key: "mt5Account" },
  { label: "Reg Date Time", key: "regDate" },
  { label: "Leverage", key: "leverage" },
];

export default function Leverage({ userDetails }) {
  const leverages = userDetails?.mt5_leverage ?? [];
  const { limit, setLimit, offset, setOffset, total, paginatedItems } =
    useClientPagination(leverages);

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
      footer={
        <TableFooter
          limit={limit}
          setLimit={setLimit}
          offset={offset}
          setOffset={setOffset}
          total={total}
        />
      }
    >
      <DataTable headers={tableHeaders}>
        {leverages.length === 0 && (
          <TableRow>
            <TableCell colSpan={tableHeaders.length} className="py-8 text-center text-sm text-muted-foreground">
              No leverage records found.
            </TableCell>
          </TableRow>
        )}

        {paginatedItems.map((row, index) => (
          <TableRow key={`${row.accno}-${index}`} className="border-b border-border hover:bg-muted/40">
            {/* SR NO */}
            <TableCell>{offset + index + 1}</TableCell>

            {/* MT5 ACCOUNT */}
            <TableCell className="font-medium">{row.accno || "-"}</TableCell>

            {/* REG DATE */}
            <TableCell className="whitespace-nowrap text-muted-foreground">{row.date || "-"}</TableCell>

            {/* LEVERAGE */}
            <TableCell>
              <span className="rounded-xl bg-blue-500/10 px-3 py-1 text-blue-600 text-xs font-semibold">
                {row.leverage}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </TableWrapper>
  );
}
