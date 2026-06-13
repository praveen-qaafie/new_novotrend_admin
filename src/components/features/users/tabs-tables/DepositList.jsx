"use client";

import DataTable from "@/components/common/tables/DataTable";
import ExportDropdown from "@/components/common/tables/ExportDropdown";
import TableFooter from "@/components/common/tables/TableFooter";
import TableSearch from "@/components/common/tables/TableSearch";
import TableWrapper from "@/components/common/tables/TableWrapper";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";

const tableHeaders = [
  { label: "S.No", key: "id" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Date", key: "date" },
  { label: "Amount", key: "amount" },
  { label: "Image", key: "image" },
  { label: "Deposit Method", key: "method" },
  { label: "Transaction ID", key: "transaction" },
  { label: "Remark", key: "remark" },
  { label: "Action", key: "action" },
];

const dummyData = [
  {
    id: 1,
    name: "Gigu testing",
    email: "gigu@qaafie.com",
    date: "09-09-2025 14:18:52",
    amount: "10.00",
    image: "",
    method: "Cash",
    transaction: "-",
    remark: "tessss",
  },
];

export default function DepositList() {
  return (
    <TableWrapper
      title="Deposit List"
      description="Manage all deposit requests"
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

            {/* IMAGE */}
            <TableCell>
              {row.image ? (
                <Image
                  src={row.image}
                  alt="deposit"
                  className="h-10 w-10 rounded-lg object-cover"
                />
              ) : (
                "-"
              )}
            </TableCell>

            {/* METHOD */}
            <TableCell>
              <span className="rounded-xl bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600">
                {row.method}
              </span>
            </TableCell>

            {/* TRANSACTION */}
            <TableCell>{row.transaction}</TableCell>

            {/* REMARK */}
            <TableCell>{row.remark}</TableCell>

            {/* ACTION */}
            <TableCell>
              <button
                className="
                  rounded-xl
                  bg-emerald-500/10
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-emerald-600
                  transition
                  hover:bg-emerald-500/20
                "
              >
                Accept
              </button>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </TableWrapper>
  );
}
