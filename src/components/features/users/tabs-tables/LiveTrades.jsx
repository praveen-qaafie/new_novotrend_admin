"use client";

import DataTable from "@/components/common/tables/DataTable";
import ExportDropdown from "@/components/common/tables/ExportDropdown";
import TableFooter from "@/components/common/tables/TableFooter";
import TableSearch from "@/components/common/tables/TableSearch";
import TableWrapper from "@/components/common/tables/TableWrapper";
import { TableCell, TableRow } from "@/components/ui/table";

const tableHeaders = [
  { label: "S.No", key: "id" },
  { label: "Symbol", key: "symbol" },
  { label: "Type", key: "type" },
  { label: "Opening Time", key: "openingTime" },
  { label: "Closing Time", key: "closingTime" },
  { label: "Opening Price", key: "openingPrice" },
  { label: "Closing Price", key: "closingPrice" },
  { label: "Volume", key: "volume" },
  { label: "Profit", key: "profit" },
  { label: "Order ID", key: "orderId" },
  { label: "MT5 ID", key: "mt5Id" },
  { label: "Commission", key: "commission" },
  { label: "Swapcharge", key: "swapcharge" },
];

const dummyData = [
  {
    id: 1,
    symbol: "EURUSD",
    type: "BUY",
    openingTime: "10-09-2025 09:15:00",
    closingTime: "10-09-2025 11:30:00",
    openingPrice: "1.0845",
    closingPrice: "1.0890",
    volume: "1.00",
    profit: "450.00",
    orderId: "ORD12345",
    mt5Id: "MT5001",
    commission: "5.00",
    swapcharge: "1.20",
  },
  {
    id: 2,
    symbol: "GBPUSD",
    type: "SELL",
    openingTime: "11-09-2025 10:00:00",
    closingTime: "11-09-2025 12:45:00",
    openingPrice: "1.2730",
    closingPrice: "1.2680",
    volume: "0.50",
    profit: "-250.00",
    orderId: "ORD12346",
    mt5Id: "MT5002",
    commission: "3.50",
    swapcharge: "0.80",
  },
];

export default function LiveTrades() {
  return (
    <TableWrapper
      title="Live Trades"
      description="Monitor all active and closed trading positions"
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

            {/* SYMBOL */}
            <TableCell className="font-semibold">{row.symbol}</TableCell>

            {/* TYPE */}
            <TableCell>
              <span
                className={`rounded-xl px-3 py-1 text-xs font-semibold
                  ${
                    row.type === "BUY"
                      ? "bg-green-500/10 text-green-600"
                      : "bg-red-500/10 text-red-500"
                  }
                `}
              >
                {row.type}
              </span>
            </TableCell>

            {/* OPEN TIME */}
            <TableCell className="whitespace-nowrap">{row.openingTime}</TableCell>

            {/* CLOSE TIME */}
            <TableCell className="whitespace-nowrap">{row.closingTime}</TableCell>

            {/* OPEN PRICE */}
            <TableCell>{row.openingPrice}</TableCell>

            {/* CLOSE PRICE */}
            <TableCell>{row.closingPrice}</TableCell>

            {/* VOLUME */}
            <TableCell>{row.volume}</TableCell>

            {/* PROFIT */}
            <TableCell className="font-semibold text-primary">{row.profit}</TableCell>

            {/* ORDER ID */}
            <TableCell className="text-muted-foreground">{row.orderId}</TableCell>

            {/* MT5 ID */}
            <TableCell>{row.mt5Id}</TableCell>

            {/* COMMISSION */}
            <TableCell>{row.commission}</TableCell>

            {/* SWAPCHARGE */}
            <TableCell>{row.swapcharge}</TableCell>
          </TableRow>
        ))}
      </DataTable>
    </TableWrapper>
  );
}
