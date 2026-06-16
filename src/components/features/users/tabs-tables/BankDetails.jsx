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
  { label: "Bank Name", key: "bankName" },
  { label: "Account No", key: "accountNo" },
  { label: "IBAN", key: "iban" },
  { label: "IFSC", key: "ifsc" },
  { label: "Status", key: "status" },
];

export default function BankDetails({ bankDetails = [] }) {
  const { limit, setLimit, offset, setOffset, total, paginatedItems } =
    useClientPagination(bankDetails);

  return (
    <TableWrapper
      title="Bank Details"
      description="Manage user bank information"
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
        {bankDetails.length === 0 && (
          <TableRow>
            <TableCell colSpan={tableHeaders.length} className="py-8 text-center text-sm text-muted-foreground">
              No bank details found.
            </TableCell>
          </TableRow>
        )}

        {paginatedItems.map((row, index) => (
          <TableRow key={`${row.account_no}-${index}`} className="border-b border-border hover:bg-muted/40">
            <TableCell>{offset + index + 1}</TableCell>
            <TableCell className="font-medium">{row.bank_name || "-"}</TableCell>
            <TableCell>{row.account_no || "-"}</TableCell>
            <TableCell>{row.iban || "-"}</TableCell>
            <TableCell>{row.ifsc || "-"}</TableCell>
            <TableCell>
              <span className="rounded-xl bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-600">
                {row.status || "-"}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </TableWrapper>
  );
}
