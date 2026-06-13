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
  { label: "Method", key: "method" },
  { label: "Payment Details", key: "paymentDetails" },
  { label: "Remark", key: "remark" },
  { label: "Action", key: "action" },
];

const dummyData = [
  {
    id: 1,
    name: "Gigu Testing",
    email: "gigu@qaafie.com",
    date: "09-09-2025 14:18:52",
    amount: "150.00",
    method: "Bank",
    paymentDetails: "HDFC **** 1234",
    remark: "Processed successfully",
  },
  {
    id: 2,
    name: "Praveen Suthar",
    email: "praveen@qaafie.com",
    date: "10-09-2025 10:20:10",
    amount: "200.00",
    method: "Crypto",
    paymentDetails: "0x8dF...9A21",
    remark: "Pending approval",
  },
];

export default function WithdrawalList() {
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

            {/* METHOD */}
            <TableCell>
              <span className="rounded-xl bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600">
                {row.method}
              </span>
            </TableCell>

            {/* PAYMENT DETAILS */}
            <TableCell className="max-w-[200px] truncate">{row.paymentDetails}</TableCell>

            {/* REMARK */}
            <TableCell>{row.remark}</TableCell>

            {/* ACTION */}
            <TableCell>
              <div className="flex gap-2">
                <button
                  className="
                    rounded-xl
                    bg-emerald-500/10
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-emerald-600
                    hover:bg-emerald-500/20
                  "
                >
                  Approve
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </TableWrapper>
  );
}
