"use client";
import { Button } from "@/components/ui/button";
import { MeterListType } from "@/lib/MetersListType";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<MeterListType>[] = [
  {
    accessorKey: "location",
    header: "الموقع",
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("location")}، {row.getValue("buildingAdress")}
        </div>
      );
    },
  },
  {
    accessorKey: "buildingAdress",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          العنوان
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "flatNumber",
    header: "رقم المنزل",
  },
  {
    accessorKey: "oldMeterNumber",
    header: "رقم العداد القديم",
  },
  {
    accessorKey: "oldMeterReading",
    header: "القرائة",
  },
  {
    accessorKey: "newMeterNumber",
    header: "رقم العداد الجديد",
  },
  {
    accessorKey: "barcode",
    header: "الباركود",
  },
  {
    accessorKey: "meterType",
    header: "نوع العداد",
  },
  {
    accessorKey: "manufacturer",
    header: "الشركة المصنعة",
  },
  {
    accessorKey: "installationType",
    header: "نوع التركيب",
  },
  {
    accessorKey: "latitude",
    header: "x",
  },
  {
    accessorKey: "longitude",
    header: "y",
  },
  {
    accessorKey: "phoneNumber",
    header: "رقم الهاتف",
  },
  {
    accessorKey: "employeeName",
    header: "الموظف",
  },
  {
    accessorKey: "insertedIn",
    header: () => <div className="text-center">تاريخ التركيب</div>,
    cell: ({ row }) => {
      const insertedIn = new Date(row.getValue("insertedIn"));
      const formatted = new Intl.DateTimeFormat("ar-ly").format(insertedIn);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "نوع النشاط",
  },
  {
    accessorKey: "companyName",
    header: "الشركة",
  },
  {
    accessorKey: "mainComapny",
    header: "الشركة الرئيسية",
  },
];
