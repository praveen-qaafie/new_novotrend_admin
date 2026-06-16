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
  { label: "Date", key: "date" },
  { label: "Amount", key: "amount" },
  { label: "Type", key: "type" },
  { label: "Remark", key: "remark" },
  { label: "Status", key: "status" },
];

export default function WithdrawalList({ userDetails }) {
  const withdrawals = userDetails?.withdrawals ?? [];
  const { limit, setLimit, offset, setOffset, total, paginatedItems } =
    useClientPagination(withdrawals);

  return (
    <TableWrapper
      title="Withdrawal List"
      description="Manage all withdrawal requests"
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
        {withdrawals.length === 0 && (
          <TableRow>
            <TableCell colSpan={tableHeaders.length} className="py-8 text-center text-sm text-muted-foreground">
              No withdrawals found.
            </TableCell>
          </TableRow>
        )}

        {paginatedItems.map((row, index) => (
          <TableRow key={`${row.date}-${index}`} className="border-b border-border hover:bg-muted/40">
            {/* # */}
            <TableCell>{offset + index + 1}</TableCell>

            {/* DATE */}
            <TableCell className="whitespace-nowrap">{row.date}</TableCell>

            {/* AMOUNT */}
            <TableCell className="font-semibold text-primary">${row.amount}</TableCell>

            <TableCell>
              <span className="rounded-xl bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600">
                {row.type || "-"}
              </span>
            </TableCell>

            {/* REMARK */}
            <TableCell>{row.remark || "-"}</TableCell>

            <TableCell>
              <span className="rounded-xl bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                {row.status || "-"}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </TableWrapper>
  );
}
