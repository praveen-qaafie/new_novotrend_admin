"use client";

import DataTable from "@/components/common/tables/DataTable";
import ExportDropdown from "@/components/common/tables/ExportDropdown";
import TableFooter from "@/components/common/tables/TableFooter";
import TableSearch from "@/components/common/tables/TableSearch";
import TableWrapper from "@/components/common/tables/TableWrapper";
import { TableCell, TableRow } from "@/components/ui/table";
import { useClientPagination } from "@/hooks/useClientPagination";
import { useUserTradingReportQuery } from "@/services/users/user.query";

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

export default function TradeReport({ userDetails }) {
  const { data } = useUserTradingReportQuery({
    user_id: userDetails?.user?.user_id,
  });
  const trades = data?.response?.trades ?? [];
  const { limit, setLimit, offset, setOffset, total, paginatedItems } =
    useClientPagination(trades);

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
        {trades.length === 0 && (
          <TableRow>
            <TableCell colSpan={tableHeaders.length} className="py-8 text-center text-sm text-muted-foreground">
              No data found.
            </TableCell>
          </TableRow>
        )}

        {paginatedItems.map((row, index) => (
          <TableRow key={`${row.orderId || row.order_id}-${index}`} className="border-b border-border hover:bg-muted/40">
            {/* # */}
            <TableCell>{offset + index + 1}</TableCell>

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
            <TableCell className="whitespace-nowrap">{row.openingTime || row.opening_time || "-"}</TableCell>

            {/* CLOSING TIME */}
            <TableCell className="whitespace-nowrap">{row.closingTime || row.closing_time || "-"}</TableCell>

            {/* OPEN PRICE */}
            <TableCell>{row.openingPrice || row.opening_price || "-"}</TableCell>

            {/* CLOSE PRICE */}
            <TableCell>{row.closingPrice || row.closing_price || "-"}</TableCell>

            {/* VOLUME */}
            <TableCell>{row.volume}</TableCell>

            {/* PROFIT */}
            <TableCell className="font-semibold text-primary">{row.profit}</TableCell>

            {/* ORDER ID */}
            <TableCell className="text-muted-foreground">{row.orderId || row.order_id || "-"}</TableCell>

            {/* MT5 ID */}
            <TableCell>{row.mt5Id || row.mt5_id || "-"}</TableCell>

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
