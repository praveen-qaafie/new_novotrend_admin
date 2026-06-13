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
  { label: "Bank Image", key: "bankImage" },
  { label: "Bank Information", key: "bankInfo" },
  { label: "Date", key: "date" },
  { label: "Action", key: "action" },
];

const dummyData = [
  {
    id: 1,
    name: "Gigu Testing",
    email: "gigu@qaafie.com",
    bankImage: "https://via.placeholder.com/40",
    bankInfo: "HDFC Bank - 1234567890 - IFSC: HDFC0001234",
    date: "10-09-2025 14:18:52",
  },
  {
    id: 2,
    name: "Praveen Suthar",
    email: "praveen@qaafie.com",
    bankImage: "",
    bankInfo: "SBI Bank - 9876543210 - IFSC: SBIN0005678",
    date: "11-09-2025 11:10:12",
  },
];

export default function BankDetails() {
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

            {/* BANK IMAGE */}
            <TableCell>
              {row.bankImage ? (
                <img src={row.bankImage} alt="bank" className="h-10 w-10 rounded-lg object-cover" />
              ) : (
                <span className="text-muted-foreground text-xs">No Image</span>
              )}
            </TableCell>

            {/* BANK INFO */}
            <TableCell className="max-w-[260px] text-sm text-muted-foreground">
              {row.bankInfo}
            </TableCell>

            {/* DATE */}
            <TableCell className="whitespace-nowrap">{row.date}</TableCell>

            {/* ACTION */}
            <TableCell>
              <div className="flex gap-2">
                <button
                  className="
                    rounded-xl
                    bg-blue-500/10
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-blue-600
                    hover:bg-emerald-500/20
                  "
                >
                  Pending
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </TableWrapper>
  );
}
