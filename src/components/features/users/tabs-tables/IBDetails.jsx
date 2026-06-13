"use client";

import DataTable from "@/components/common/tables/DataTable";
import ExportDropdown from "@/components/common/tables/ExportDropdown";
import TableFooter from "@/components/common/tables/TableFooter";
import TableSearch from "@/components/common/tables/TableSearch";
import TableWrapper from "@/components/common/tables/TableWrapper";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight } from "lucide-react";

const tableHeaders = [
  { label: "S.No", key: "id" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Mobile", key: "mobile" },
  { label: "Country", key: "country" },
  { label: "Date", key: "date" },
  { label: "IB Name", key: "ibName" },
  { label: "Total Commission", key: "totalCommission" },
  { label: "Total Volume", key: "totalVolume" },
  { label: "Action", key: "action" },
];

const dummyData = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    mobile: "9876543210",
    country: "India",
    date: "10-06-2025",
    ibName: "IB Master 01",
    totalCommission: "$1200",
    totalVolume: "35.50",
  },
  {
    id: 2,
    name: "Amit Verma",
    email: "amit@example.com",
    mobile: "9123456780",
    country: "UAE",
    date: "12-06-2025",
    ibName: "IB Master 02",
    totalCommission: "$980",
    totalVolume: "22.10",
  },
];

export default function IBDetails() {
  const handleDownline = row => {
    console.log("Open Downline:", row);
    // later: navigate or modal open
  };

  return (
    <TableWrapper
      title="IB Details"
      description="Manage IB users and their commission data"
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

            {/* MOBILE */}
            <TableCell>{row.mobile}</TableCell>

            {/* COUNTRY */}
            <TableCell>{row.country}</TableCell>

            {/* DATE */}
            <TableCell className="whitespace-nowrap">{row.date}</TableCell>

            {/* IB NAME */}
            <TableCell className="font-medium text-primary">{row.ibName}</TableCell>

            {/* TOTAL COMMISSION */}
            <TableCell className="font-semibold text-green-600">{row.totalCommission}</TableCell>

            {/* TOTAL VOLUME */}
            <TableCell>{row.totalVolume}</TableCell>

            {/* ACTION */}
            <TableCell>
              <button
                onClick={() => handleDownline(row)}
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
                Downline
                <ArrowRight className="h-4 w-4" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </TableWrapper>
  );
}
