"use client"

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiUrl } from "@/lib/Constants";
import { MeterListType } from "@/lib/MetersListType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useState } from "react";
import * as XLSX from "xlsx";
import { useParams } from "next/navigation";


const MetersList = () => {
  const params = useParams()
  const [page, setPage] = useState<number>(1);
  const fetchData = async (page: number) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/MeterInstallations/GetMetersByCompany?CompanyGuid=${params.id}&Page=${page}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const { data: metersData } = useQuery<MeterListType[]>({
    queryKey: ["metersData", page],
    queryFn: () => fetchData(page),
  });

  const exportToExcel = (data: MeterListType[]) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };

  return (
    <div>
      <h1 className="text-2xl">قائمة التركيبات</h1>
      <div className="space-y-4">
        <Button onClick={() => exportToExcel(metersData || [])}>
          تصدير إكسل
        </Button>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
                السابق
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button variant="outline" disabled>
                الصفحة {page}
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button onClick={() => setPage((prev) => prev + 1)}>
                التالي
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الموقع</TableHead>
              <TableHead>العنوان</TableHead>
              <TableHead>رقم الشقة</TableHead>
              <TableHead>رقم العداد القديم</TableHead>
              <TableHead>القراءة</TableHead>
              <TableHead>رقم العداد الجديد</TableHead>
              <TableHead>الباركود</TableHead>
              <TableHead>نوع العداد</TableHead>
              <TableHead>الشركة المصنعة</TableHead>
              <TableHead>نوع التركيب</TableHead>
              <TableHead>الاحداثيات</TableHead>
              <TableHead>رقم الهاتف</TableHead>
              <TableHead>اسم الموظف</TableHead>
              <TableHead>تاريخ التركيب</TableHead>
              <TableHead>التصنيف</TableHead>
              <TableHead>الشركة المنفذة</TableHead>
              <TableHead>الشركة المكلفة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metersData?.map((x) => (
              <TableRow key={x.barcode}>
                <TableCell>{x.location}</TableCell>
                <TableCell>{x.buildingAdress}</TableCell>
                <TableCell>{x.flatNumber}</TableCell>
                <TableCell>{x.oldMeterNumber}</TableCell>
                <TableCell>{x.oldMeterReading}</TableCell>
                <TableCell>{x.newMeterNumber}</TableCell>
                <TableCell>{x.barcode}</TableCell>
                <TableCell>{x.meterType}</TableCell>
                <TableCell>{x.manufacturer}</TableCell>
                <TableCell>{x.installationType}</TableCell>
                <TableCell>
                  {x.latitude}, {x.longitude}
                </TableCell>
                <TableCell>{x.phoneNumber}</TableCell>
                <TableCell>{x.employeeName}</TableCell>
                {/* <TableCell>{x.insertedIn.toDateString()}</TableCell> */}
                <TableCell>{x.category}</TableCell>
                <TableCell>{x.companyName}</TableCell>
                <TableCell>{x.mainComapny}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MetersList;
