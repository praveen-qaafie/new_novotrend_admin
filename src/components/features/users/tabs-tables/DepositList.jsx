"use client";

import DataTable from "@/components/common/tables/DataTable";
import ExportDropdown from "@/components/common/tables/ExportDropdown";
import TableFooter from "@/components/common/tables/TableFooter";
import TableSearch from "@/components/common/tables/TableSearch";
import TableWrapper from "@/components/common/tables/TableWrapper";
import TruncatedCell from "@/components/common/TruncatedCell";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { useClientPagination } from "@/hooks/useClientPagination";
import Image from "next/image";
import { useState } from "react";

const tableHeaders = [
  { label: "#", key: "id" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Date", key: "date" },
  { label: "Amount", key: "amount" },
  { label: "Image", key: "image" },
  { label: "Deposit Method", key: "method" },
  { label: "Transaction ID", key: "transaction" },
  { label: "Remark", key: "remark" },
  { label: "Action", key: "action" },
];

const getValue = (source, keys, fallback = "-") => {
  const value = keys.find(
    key => source?.[key] !== undefined && source?.[key] !== null && source?.[key] !== ""
  );

  return value ? source[value] : fallback;
};

const getStatusLabel = status => {
  const normalized = String(status ?? "").toLowerCase();

  if (normalized === "1" || normalized === "accepted" || normalized === "accept") return "Accept";
  if (normalized === "2" || normalized === "rejected" || normalized === "reject") return "Reject";
  if (normalized === "0" || normalized === "pending") return "Pending";

  return status || "-";
};

const getStatusClassName = status => {
  const label = getStatusLabel(status).toLowerCase();

  if (label === "accept") return "bg-emerald-500/20 text-emerald-700";
  if (label === "reject") return "bg-yellow-500/30 text-yellow-700";
  if (label === "pending") return "bg-blue-500/10 text-blue-600";

  return "bg-muted text-muted-foreground";
};

const getMediaUrl = (source, keys) => {
  const value = getValue(source, keys, "");
  return typeof value === "string" ? value.trim() : "";
};

export default function DepositList({ userDetails }) {
  const [search, setSearch] = useState("");
  const [imageOpen, setImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const deposits = userDetails?.deposits ?? [];
  const selectedUser = userDetails?.user ?? {};
  const { limit, setLimit, offset, setOffset, total, paginatedItems } =
    useClientPagination(deposits, 10, search, [selectedUser?.name, selectedUser?.email]);

  return (
    <TableWrapper
      title="Deposit List"
      description="Manage all deposit requests"
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
        {deposits.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={tableHeaders.length}
              className="py-8 text-center text-sm text-muted-foreground"
            >
              No deposits found.
            </TableCell>
          </TableRow>
        )}

        {paginatedItems.map((row, index) => (
          <TableRow key={`${row.transaction_id}-${index}`} className="border-b border-border hover:bg-muted/40">
            <TableCell className="px-6 py-5">{offset + index + 1}</TableCell>

            <TableCell className="px-6 py-5">{selectedUser?.name || "-"}</TableCell>

            <TableCell className="px-6 py-5">{selectedUser?.email || "-"}</TableCell>

            <TableCell className="whitespace-nowrap px-6 py-5">
              {getValue(row, ["date", "req_date", "accepted_date"])}
            </TableCell>

            <TableCell className="px-6 py-5 font-semibold text-primary">
              ${getValue(row, ["amount"], "0.00")}
            </TableCell>

            <TableCell className="px-6 py-5">
              {getMediaUrl(row, ["image", "req_image"]) ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(getMediaUrl(row, ["image", "req_image"]));
                    setImageOpen(true);
                  }}
                  className="overflow-hidden rounded-2xl border border-border"
                >
                  <Image
                    src={getMediaUrl(row, ["image", "req_image"])}
                    alt="Deposit Proof"
                    width={96}
                    height={64}
                    className="h-16 w-24 object-cover transition-all hover:scale-105"
                  />
                </button>
              ) : (
                <span className="text-xs text-muted-foreground">No Image</span>
              )}
            </TableCell>

            <TableCell className="px-6 py-5">
              <span className="rounded-xl bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600">
                {getValue(row, ["deposit_type", "method", "paymethod"])}
              </span>
            </TableCell>

            <TableCell className="px-6 py-5">
              {getValue(row, ["transaction_id", "transid", "transaction"])}
            </TableCell>

            <TableCell className="px-6 py-5">
              <TruncatedCell text={getValue(row, ["remark", "remarks"])} maxLength={50} />
            </TableCell>

            <TableCell className="px-6 py-5">
              <span
                className={`inline-flex min-w-24 justify-center rounded px-4 py-2 text-sm font-medium ${getStatusClassName(row.status)}`}
              >
                {getStatusLabel(row.status)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>

      <Dialog open={imageOpen} onOpenChange={setImageOpen}>
        <DialogContent className="max-w-5xl overflow-hidden rounded-3xl border border-border bg-background p-4">
          <DialogTitle className="sr-only">Deposit Image Preview</DialogTitle>
          <div className="overflow-hidden rounded-2xl">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Deposit Preview"
                width={900}
                height={700}
                className="max-h-[80vh] w-full rounded-2xl object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </TableWrapper>
  );
}
