"use client";

import DataTable from "@/components/common/tables/DataTable";
import ExportDropdown from "@/components/common/tables/ExportDropdown";
import TableFooter from "@/components/common/tables/TableFooter";
import TableSearch from "@/components/common/tables/TableSearch";
import TableWrapper from "@/components/common/tables/TableWrapper";
import { TableCell, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";

const tableHeaders = [
  { label: "S.No", key: "id" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Date", key: "date" },
  { label: "Amount", key: "amount" },
  { label: "Remark", key: "remark" },
  { label: "Action", key: "action" },
];

const dummyData = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    date: "10-06-2025",
    amount: "$500",
    remark: "Approved by admin",
  },
  {
    id: 2,
    name: "Amit Verma",
    email: "amit@example.com",
    date: "12-06-2025",
    amount: "$1200",
    remark: "Pending verification",
  },
];

export default function IbWithdrawal() {
  const handleView = row => {
    console.log("View IB Withdrawal:", row);
    // later: modal or details page
  };

  return (
    <TableWrapper
      title="IB Withdrawal"
      description="Manage IB withdrawal requests"
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
            <TableCell className="font-semibold text-primary">{row.amount}</TableCell>

            {/* REMARK */}
            <TableCell className="text-muted-foreground">{row.remark}</TableCell>

            {/* ACTION */}
            <TableCell>
              <button
                onClick={() => handleView(row)}
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
                <Eye className="h-4 w-4" />
                View
              </button>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </TableWrapper>
  );
}
