"use client";

import AllFilters from "@/components/common/report/filter/AllFilters";
import AmountStats from "@/components/common/report/filter/AmountsStats";
import DataTable from "@/components/common/tables/DataTable";
import ExportDropdown from "@/components/common/tables/ExportDropdown";
import TableFooter from "@/components/common/tables/TableFooter";
import TableSearch from "@/components/common/tables/TableSearch";
import TableWrapper from "@/components/common/tables/TableWrapper";
import TruncatedCell from "@/components/common/TruncatedCell";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { useWalletRequestHistoryQuery } from "@/services/report/report.query";
import Image from "next/image";
import { useState } from "react";

const KycThumbnail = ({ src, alt, onPreview }) => {
  if (!src) {
    return (
      <div className="flex h-16 w-24 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 text-xs font-medium text-muted-foreground">
        No image
      </div>
    );
  }

  return (
    <button onClick={onPreview} className="overflow-hidden rounded-2xl border border-border">
      <Image
        src={src}
        alt={alt}
        width={96}
        height={64}
        className="h-16 w-24 object-cover transition-all hover:scale-105"
      />
    </button>
  );
};

const tableHeaders = [
  { label: "S.No", key: "id" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Date", key: "date" },
  { label: "Amount", key: "amount" },
  { label: "Deposit Type", key: "depositType" },
  { label: "Image", key: "image" },
  { label: "Status", key: "status" },
  { label: "Transaction ID", key: "transactionId" },
  { label: "Accepted By", key: "acceptedBy" },
  { label: "Remark", key: "remark" },
  { label: "Accepted Date", key: "acceptedDate" },
];

export default function DepositReport() {
  const [search, setSearch] = useState("");
  const [imageOpen, setImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  // Draft filters (UI state)
  const [filters, setFilters] = useState({
    email: "",
    start_date: "",
    end_date: "",
    payment: "",
    status: "All",
  });

  // Applied filters (API state)
  const [appliedFilters, setAppliedFilters] = useState({
    email: "",
    start_date: "",
    end_date: "",
    payment: "",
    status: "",
  });

  // ---------------- FILTER HANDLERS ----------------

  const handleChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFilter = () => {
    setOffset(0);

    setAppliedFilters({
      email: filters.email,
      start_date: filters.start_date,
      end_date: filters.end_date,
      payment: filters.payment,
      status: filters.status === "All" ? "" : filters.status,
    });
  };

  const handleReset = () => {
    const reset = {
      email: "",
      start_date: "",
      end_date: "",
      payment: "",
      status: "All",
    };

    setFilters(reset);
    setAppliedFilters({
      email: "",
      start_date: "",
      end_date: "",
      payment: "",
      status: "",
    });

    setOffset(0);
  };

  const handleSearchChange = value => {
    setSearch(value);
    setOffset(0);
  };

  // ---------------- API CALL ----------------

  const { data, isLoading } = useWalletRequestHistoryQuery({
    limit,
    offset,
    search,
    useremail: appliedFilters.email,
    sdate: appliedFilters.start_date,
    edate: appliedFilters.end_date,
    paytype: appliedFilters.payment,
    status: appliedFilters.status,
  });

  const summary = data?.response?.summary || {};
  const tableData = data?.response?.deposit_history || [];
  const total = Number(data?.response?.total_records) || 0;

  return (
    <div className="space-y-6">
      {/* ---------------- STATS ---------------- */}
      <AmountStats
        items={[
          {
            title: "Bank Deposit",
            value: summary.bank_total || 0,
            prefix: "$",
            color: "blue",
          },
          {
            title: "Cash Deposit",
            value: summary.cash_total || 0,
            prefix: "$",
            color: "green",
          },
          {
            title: "Crypto Deposit",
            value: summary.crypto_total || 0,
            prefix: "$",
            color: "orange",
          },
          {
            title: "Total",
            value: summary.grand_total || 0,
            prefix: "$",
            color: "blue",
          },
        ]}
      />

      {/* ---------------- FILTERS ---------------- */}
      <AllFilters
        values={filters}
        onChange={handleChange}
        onSubmit={handleFilter}
        onReset={handleReset}
        showEmail
        showStartDate
        showEndDate
        showPayment
        showStatus
        paymentOptions={["Bank", "Cash", "Crypto"]}
        statusOptions={["All", "Accepted", "Pending", "Rejected"]}
      />

      {/* ---------------- TABLE ---------------- */}
      <TableWrapper
        title="Deposit Report"
        description="View and manage deposit requests"
        actions={
          <>
            <TableSearch value={search} onChange={handleSearchChange} />
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={12} className="py-10 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : tableData.length > 0 ? (
            tableData.map((row, index) => (
              <TableRow key={row.id || index} className="border-b border-border">
                <TableCell className="px-6 py-5">{offset + index + 1}</TableCell>
                <TableCell className="px-6 py-5">{row.name}</TableCell>
                <TableCell className="px-6 py-5">{row.email}</TableCell>
                <TableCell className="px-6 py-5">{row.date}</TableCell>

                <TableCell className="px-6 py-5">
                  <span className="font-semibold text-primary">${row.amount}</span>
                </TableCell>

                <TableCell className="px-6 py-5">{row.deposit_type}</TableCell>
                {/* <TableCell className="px-6 py-5">{row.image || "-"}</TableCell> */}

                <TableCell className="px-6 py-5">
                  <KycThumbnail
                    src={row.image}
                    alt="bank_image"
                    onPreview={() => {
                      setSelectedImage(row.image);
                      setImageOpen(true);
                    }}
                  />
                </TableCell>

                <TableCell className="px-6 py-5">
                  <span className="rounded-xl bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                    {row.status}
                  </span>
                </TableCell>

                <TableCell className="px-6 py-5">{row.transaction_id}</TableCell>
                <TableCell className="px-6 py-5">{row.accepted_by}</TableCell>
                <TableCell className="px-6 py-5">
                  <TruncatedCell text={row.remark} maxLength={50} />
                </TableCell>
                <TableCell className="px-6 py-5">{row.accepted_date}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={12} className="py-10 text-center">
                No data found
              </TableCell>
            </TableRow>
          )}
        </DataTable>

        <Dialog open={imageOpen} onOpenChange={setImageOpen}>
          <DialogContent className="max-w-5xl rounded-3xl border border-border bg-background p-4 overflow-hidden">
            <DialogTitle className="sr-only">KYC Image Preview</DialogTitle>
            <div className="overflow-hidden rounded-2xl">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="KYC Preview"
                  className="max-h-[80vh] w-full rounded-2xl object-cover"
                  width={94}
                  height={94}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </TableWrapper>
    </div>
  );
}
