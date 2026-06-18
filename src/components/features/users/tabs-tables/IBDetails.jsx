"use client";

import DataTable from "@/components/common/tables/DataTable";
import ExportDropdown from "@/components/common/tables/ExportDropdown";
import TableFooter from "@/components/common/tables/TableFooter";
import TableSearch from "@/components/common/tables/TableSearch";
import TableWrapper from "@/components/common/tables/TableWrapper";
import { TableCell, TableRow } from "@/components/ui/table";
import { useClientPagination } from "@/hooks/useClientPagination";
import { useUserIbDetailsQuery } from "@/services/users/user.query";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

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

export default function IBDetails({ userDetails }) {
  const [search, setSearch] = useState("");
  const { data } = useUserIbDetailsQuery({
    user_id: userDetails?.user?.user_id,
  });
  const ibDetails = Array.isArray(data?.response) ? data.response : [];
  const { limit, setLimit, offset, setOffset, total, paginatedItems } =
    useClientPagination(ibDetails, 10, search);

  const handleDownline = row => {
        // later: navigate or modal open
  };

  return (
    <TableWrapper
      title="IB Details"
      description="Manage IB users and their commission data"
      actions={
        <>
          <TableSearch value={search} onChange={value => { setSearch(value); setOffset(0); }} />
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
        {ibDetails.length === 0 && (
          <TableRow>
            <TableCell colSpan={tableHeaders.length} className="py-8 text-center text-sm text-muted-foreground">
              No data found.
            </TableCell>
          </TableRow>
        )}

        {paginatedItems.map((row, index) => (
          <TableRow key={`${row.email}-${index}`} className="border-b border-border hover:bg-muted/40">
            {/* # */}
            <TableCell>{offset + index + 1}</TableCell>

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
            <TableCell className="font-medium text-primary">{row.ib_name || row.ibName || "-"}</TableCell>

            {/* TOTAL COMMISSION */}
            <TableCell className="font-semibold text-green-600">{row.total_commission || row.totalCommission || "-"}</TableCell>

            {/* TOTAL VOLUME */}
            <TableCell>{row.total_volume || row.totalVolume || "-"}</TableCell>

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
