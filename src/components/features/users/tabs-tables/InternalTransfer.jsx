"use client";

import DataTable from "@/components/common/tables/DataTable";
import ExportDropdown from "@/components/common/tables/ExportDropdown";
import TableFooter from "@/components/common/tables/TableFooter";
import TableSearch from "@/components/common/tables/TableSearch";
import TableWrapper from "@/components/common/tables/TableWrapper";
import { TableCell, TableRow } from "@/components/ui/table";

const tableHeaders = [
  { label: "S.No", key: "id" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Date", key: "date" },
  { label: "Amount", key: "amount" },
  { label: "From", key: "from" },
  { label: "To", key: "to" },
  { label: "Note", key: "note" },
];

const dummyData = [
  {
    id: 1,
    name: "Gigu Testing",
    email: "gigu@qaafie.com",
    date: "10-09-2025 14:18:52",
    amount: "250.00",
    from: "Main Wallet",
    to: "Trading Account",
    note: "Internal transfer completed",
  },
  {
    id: 2,
    name: "Praveen Suthar",
    email: "praveen@qaafie.com",
    date: "11-09-2025 11:10:12",
    amount: "500.00",
    from: "IB Wallet",
    to: "Main Wallet",
    note: "Transfer for trading",
  },
];

export default function InternalTransfer() {
  return (
    <TableWrapper
      title="Internal Transfer"
      description="Manage all internal wallet transfers"
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
            {/* # */}
            <TableCell>{row.id}</TableCell>

            {/* NAME */}
            <TableCell className="font-medium">{row.name}</TableCell>

            {/* EMAIL */}
            <TableCell>{row.email}</TableCell>

            {/* DATE */}
            <TableCell className="whitespace-nowrap">{row.date}</TableCell>

            {/* AMOUNT */}
            <TableCell className="font-semibold text-primary">${row.amount}</TableCell>

            {/* FROM */}
            <TableCell>
              <span className="rounded-xl bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600">
                {row.from}
              </span>
            </TableCell>

            {/* TO */}
            <TableCell>
              <span className="rounded-xl bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
                {row.to}
              </span>
            </TableCell>

            {/* NOTE */}
            <TableCell className="max-w-[220px] truncate">{row.note}</TableCell>
          </TableRow>
        ))}
      </DataTable>
    </TableWrapper>
  );
}
