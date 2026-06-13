"use client";

import DataTable from "@/components/common/tables/DataTable";
import ExportDropdown from "@/components/common/tables/ExportDropdown";
import TableFooter from "@/components/common/tables/TableFooter";
import TableSearch from "@/components/common/tables/TableSearch";
import TableWrapper from "@/components/common/tables/TableWrapper";
import { TableCell, TableRow } from "@/components/ui/table";

const tableHeaders = [
  { label: "S.No", key: "id" },
  { label: "MT5 Account No", key: "account" },
  { label: "Reg Date Time", key: "date" },
  { label: "Leverage", key: "leverage" },
  { label: "Currency", key: "currency" },
  { label: "Deposit", key: "deposit" },
  { label: "Withdraw", key: "withdraw" },
  { label: "Profit", key: "profit" },
  { label: "Balance", key: "balance" },
  { label: "Equity", key: "equity" },
  { label: "Free Margin", key: "freeMargin" },
];

const dummyData = [
  {
    id: 1,
    account: "MT50001",
    date: "10 Apr 2026 10:20 AM",
    leverage: "1:500",
    currency: "USD",
    deposit: 1200,
    withdraw: 200,
    profit: 340,
    balance: 1340,
    equity: 1500,
    freeMargin: 160,
  },
  {
    id: 2,
    account: "MT50002",
    date: "11 Apr 2026 02:10 PM",
    leverage: "1:300",
    currency: "USD",
    deposit: 800,
    withdraw: 100,
    profit: 120,
    balance: 820,
    equity: 900,
    freeMargin: 80,
  },
];

export default function TradingAccount() {
  return (
    <TableWrapper
      title="Trading Account Details"
      description="All MT5 trading accounts overview"
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
            <TableCell>{row.id}</TableCell>

            <TableCell className="font-medium">{row.account}</TableCell>

            <TableCell className="whitespace-nowrap">{row.date}</TableCell>

            <TableCell>{row.leverage}</TableCell>

            <TableCell>{row.currency}</TableCell>

            <TableCell className="text-green-600 font-medium">{row.deposit}</TableCell>

            <TableCell className="text-red-500 font-medium">{row.withdraw}</TableCell>

            <TableCell>{row.profit}</TableCell>

            <TableCell className="font-semibold">{row.balance}</TableCell>

            <TableCell>{row.equity}</TableCell>

            <TableCell>{row.freeMargin}</TableCell>
          </TableRow>
        ))}
      </DataTable>
    </TableWrapper>
  );
}
