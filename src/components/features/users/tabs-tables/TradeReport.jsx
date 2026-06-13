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
    symbol: "XAUUSD",
    type: "BUY",
    openingTime: "12-09-2025 09:10:00",
    closingTime: "12-09-2025 11:40:00",
    openingPrice: "2310.50",
    closingPrice: "2325.10",
    volume: "0.20",
    profit: "290.00",
    orderId: "TRD10001",
    mt5Id: "MT5010",
    commission: "4.00",
    swapcharge: "0.90",
  },
  {
    id: 2,
    symbol: "BTCUSD",
    type: "SELL",
    openingTime: "12-09-2025 10:00:00",
    closingTime: "12-09-2025 12:00:00",
    openingPrice: "65000",
    closingPrice: "64500",
    volume: "0.05",
    profit: "250.00",
    orderId: "TRD10002",
    mt5Id: "MT5011",
    commission: "6.00",
    swapcharge: "1.50",
  },
];

export default function TradeReport() {
  return (
    <TableWrapper
      title="Trade Report"
      description="Complete record of all trading activity"
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
                className={`px-3 py-1 rounded-xl text-xs font-semibold
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

            {/* OPENING TIME */}
            <TableCell className="whitespace-nowrap">{row.openingTime}</TableCell>

            {/* CLOSING TIME */}
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
