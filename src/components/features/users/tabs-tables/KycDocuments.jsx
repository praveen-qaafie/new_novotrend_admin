// "use client";

// import DataTable from "@/components/common/tables/DataTable";
// import TableWrapper from "@/components/common/tables/TableWrapper";
// import { TableCell, TableRow } from "@/components/ui/table";

// const tableHeaders = [
//   { label: "S.No", key: "id" },
//   { label: "Name", key: "name" },
//   { label: "Email", key: "email" },
//   { label: "Date", key: "date" },
//   { label: "Amount", key: "amount" },
//   { label: "From", key: "from" },
//   { label: "To", key: "to" },
//   { label: "Note", key: "note" },
// ];

// const dummyData = [
//   {
//     id: 1,
//     name: "Gigu Testing",
//     email: "gigu@qaafie.com",
//     date: "10-09-2025 14:18:52",
//     amount: "0",
//     from: "User KYC",
//     to: "Admin Review",
//     note: "KYC submitted for verification",
//   },
//   {
//     id: 2,
//     name: "Praveen Suthar",
//     email: "praveen@qaafie.com",
//     date: "11-09-2025 11:10:12",
//     amount: "0",
//     from: "User Upload",
//     to: "Pending Approval",
//     note: "Document uploaded successfully",
//   },
// ];

// export default function KycDocument() {
//   return (
//     <TableWrapper title="KYC Documents" description="Manage user KYC verification records">
//       <DataTable headers={tableHeaders}>
//         {dummyData.map(row => (
//           <TableRow key={row.id} className="border-b border-border hover:bg-muted/40">
//             {/* # */}
//             <TableCell>{row.id}</TableCell>

//             {/* NAME */}
//             <TableCell className="font-medium">{row.name}</TableCell>

//             {/* EMAIL */}
//             <TableCell>{row.email}</TableCell>

//             {/* DATE */}
//             <TableCell className="whitespace-nowrap">{row.date}</TableCell>

//             {/* AMOUNT */}
//             <TableCell className="text-primary font-semibold">{row.amount}</TableCell>

//             {/* FROM */}
//             <TableCell>
//               <span className="rounded-xl bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600">
//                 {row.from}
//               </span>
//             </TableCell>

//             {/* TO */}
//             <TableCell>
//               <span className="rounded-xl bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
//                 {row.to}
//               </span>
//             </TableCell>

//             {/* NOTE */}
//             <TableCell className="max-w-[240px] truncate text-muted-foreground">
//               {row.note}
//             </TableCell>
//           </TableRow>
//         ))}
//       </DataTable>
//     </TableWrapper>
//   );
// }
"use client";

import DataTable from "@/components/common/tables/DataTable";
import ExportDropdown from "@/components/common/tables/ExportDropdown";
import TableFooter from "@/components/common/tables/TableFooter";
import TableSearch from "@/components/common/tables/TableSearch";
import TableWrapper from "@/components/common/tables/TableWrapper";
import { TableCell, TableRow } from "@/components/ui/table";
import { useClientPagination } from "@/hooks/useClientPagination";
import Image from "next/image";
import { useState } from "react";

const tableHeaders = [
  { label: "S.No", key: "id" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Type Of Document", key: "docType" },
  { label: "ID Front", key: "idFront" },
  { label: "ID Back", key: "idBack" },
  { label: "Address Front", key: "addressFront" },
  { label: "Address Back", key: "addressBack" },
  { label: "Uploaded", key: "uploaded" },
  { label: "Action", key: "action" },
];

const getFileUrl = value => (typeof value === "string" ? value.trim() : "");

const isPdfFile = value => getFileUrl(value).toLowerCase().split("?")[0].endsWith(".pdf");

const DocumentPreview = ({ src, alt }) => {
  const fileUrl = getFileUrl(src);

  if (!fileUrl) {
    return <span className="text-xs text-muted-foreground">No Image</span>;
  }

  if (isPdfFile(fileUrl)) {
    return (
      <a
        href={fileUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-10 items-center rounded-xl bg-primary/10 px-3 text-xs font-semibold text-primary hover:bg-primary/20"
      >
        View PDF
      </a>
    );
  }

  return (
    <a href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex overflow-hidden rounded-lg border border-border">
      <Image src={fileUrl} alt={alt} width={56} height={40} className="h-10 w-14 object-cover" />
    </a>
  );
};

export default function KycDocument({ userDetails }) {
  const [search, setSearch] = useState("");
  const documents = userDetails?.kyc_doc ?? [];
  const selectedUser = userDetails?.user ?? {};
  const { limit, setLimit, offset, setOffset, total, paginatedItems } =
    useClientPagination(documents, 10, search, [selectedUser?.name, selectedUser?.email]);

  return (
    <TableWrapper
      title="KYC Documents"
      description="Manage user verification documents"
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
        {documents.length === 0 && (
          <TableRow>
            <TableCell colSpan={tableHeaders.length} className="py-8 text-center text-sm text-muted-foreground">
              No KYC documents found.
            </TableCell>
          </TableRow>
        )}

        {paginatedItems.map((row, index) => (
          <TableRow key={`${row.date}-${index}`} className="border-b border-border hover:bg-muted/40">
            {/* # */}
            <TableCell>{offset + index + 1}</TableCell>

            {/* NAME */}
            <TableCell className="font-medium">{userDetails?.user?.name || "-"}</TableCell>

            {/* EMAIL */}
            <TableCell>{userDetails?.user?.email || "-"}</TableCell>

            {/* DOC TYPE */}
            <TableCell>
              <span className="rounded-xl bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600">
                {row.doc_type || "-"}
              </span>
            </TableCell>

            <TableCell>
              <DocumentPreview src={row.front} alt="id-front" />
            </TableCell>

            <TableCell>
              <DocumentPreview src={row.back} alt="id-back" />
            </TableCell>

            <TableCell>
              <DocumentPreview src={row.address_front} alt="address-front" />
            </TableCell>

            <TableCell>
              <DocumentPreview src={row.address_back} alt="address-back" />
            </TableCell>

            {/* UPLOADED DATE */}
            <TableCell className="whitespace-nowrap text-muted-foreground">
              {row.date || "-"}
            </TableCell>

            {/* ACTION */}
            {/* ACTION */}
            <TableCell>
              <div className="flex gap-2">
                <button
                  className="
                    rounded-xl
                    bg-green-500/10
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-green-600
                    hover:bg-green-500/20
                  "
                >
                  {row.status || "-"}
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </TableWrapper>
  );
}
