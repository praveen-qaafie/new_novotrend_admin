"use client";

import DataTable from "@/components/common/tables/DataTable";
import ExportDropdown from "@/components/common/tables/ExportDropdown";
import TableFooter from "@/components/common/tables/TableFooter";
import TableSearch from "@/components/common/tables/TableSearch";
import TableWrapper from "@/components/common/tables/TableWrapper";
import { TableCell, TableRow } from "@/components/ui/table";

const tableHeaders = [
  { label: "S.No", key: "id" },
  { label: "MT5 ID", key: "mt5Id" },
  { label: "Date", key: "date" },
  { label: "Order", key: "order" },
  { label: "Volume", key: "volume" },
  { label: "Commission", key: "commission" },
];

const dummyData = [
  {
    id: 1,
    mt5Id: "MT50001",
    date: "10-06-2025",
    order: "ORD1001",
    volume: "0.50",
    commission: "$25",
  },
  {
    id: 2,
    mt5Id: "MT50002",
    date: "11-06-2025",
    order: "ORD1002",
    volume: "1.20",
    commission: "$60",
  },
];

export default function CommissionHistory() {
  return (
    <TableWrapper
      title="Commission History"
      description="Track all MT5 commission records"
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

            {/* MT5 ID */}
            <TableCell className="font-medium">{row.mt5Id}</TableCell>

            {/* DATE */}
            <TableCell className="whitespace-nowrap">{row.date}</TableCell>

            {/* ORDER */}
            <TableCell>
              <span className="text-muted-foreground font-medium">{row.order}</span>
            </TableCell>

            {/* VOLUME */}
            <TableCell>{row.volume}</TableCell>

            {/* COMMISSION */}
            <TableCell className="font-semibold text-green-600">{row.commission}</TableCell>
          </TableRow>
        ))}
      </DataTable>
    </TableWrapper>
  );
}
