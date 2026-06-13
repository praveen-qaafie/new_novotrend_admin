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
import Image from "next/image";

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

const dummyData = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    docType: "Aadhar Card",
    idFront: "/demo/id-front.jpg",
    idBack: "/demo/id-back.jpg",
    addressFront: "/demo/address-front.jpg",
    addressBack: "/demo/address-back.jpg",
    uploaded: "12-06-2025",
  },
];

export default function KycDocument() {
  const handleView = row => {
    console.log("View KYC:", row);
  };

  return (
    <TableWrapper
      title="KYC Documents"
      description="Manage user verification documents"
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

            {/* DOC TYPE */}
            <TableCell>
              <span className="rounded-xl bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600">
                {row.docType}
              </span>
            </TableCell>

            {/* ID FRONT */}
            <TableCell>
              <Image
                src={row.idFront}
                alt="id-front"
                width={50}
                height={50}
                className="h-10 w-14 rounded-lg object-cover "
              />
            </TableCell>

            {/* ID BACK */}
            <TableCell>
              <Image
                src={row.idBack}
                alt="id-back"
                width={50}
                height={50}
                className="h-10 w-14 rounded-lg object-cover "
              />
            </TableCell>

            {/* ADDRESS FRONT */}
            <TableCell>
              <Image
                src={row.addressFront}
                alt="address-front"
                width={50}
                height={50}
                className="h-10 w-14 rounded-lg object-cover "
              />
            </TableCell>

            {/* ADDRESS BACK */}
            <TableCell>
              <Image
                src={row.addressBack}
                alt="address-back"
                width={50}
                height={50}
                className="h-10 w-14 rounded-lg object-cover "
              />
            </TableCell>

            {/* UPLOADED DATE */}
            <TableCell className="whitespace-nowrap text-muted-foreground">
              {row.uploaded}
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
                  Accept
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </TableWrapper>
  );
}
