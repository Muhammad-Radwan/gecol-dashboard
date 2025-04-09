"use client";

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
import { ExportExcel } from "@/lib/ExportExcel";
import { MeterListType } from "@/lib/MetersListType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
const MetersList = () => {
  const params = useParams();
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

  return (
    <div>
      <h1 className="text-2xl">قائمة التركيبات</h1>
      <div className="space-y-4">
        <div className="flex items-center">
          <Button
            className="mt-3"
            onClick={() => ExportExcel(metersData || [])}
          >
            تصدير إكسل (الصفحة الحالية)
          </Button>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                >
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
        </div>

        <div className="rounded-md border container mx-auto py-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">العنوان</TableHead>
                <TableHead className="text-center">رقم الشقة</TableHead>
                <TableHead className="text-center">رقم العداد القديم</TableHead>
                <TableHead className="text-center">القراءة</TableHead>
                <TableHead className="text-center">رقم العداد الجديد</TableHead>
                <TableHead className="text-center">الباركود</TableHead>
                <TableHead className="text-center">نوع العداد</TableHead>
                <TableHead className="text-center">نوع التركيب</TableHead>
                <TableHead className="text-center">الاحداثيات</TableHead>
                <TableHead className="text-center">تاريخ التركيب</TableHead>
                <TableHead className="text-center">نوع النشاط</TableHead>
                <TableHead className="text-center">الشركة المنفذة</TableHead>
                <TableHead className="text-center">الشركة المكلفة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!metersData?.length ? (
                <TableRow>
                  <TableCell className="text-center text-xl" colSpan={13}>
                    لا توجد نتائج
                  </TableCell>
                </TableRow>
              ) : (
                metersData?.map((x) => (
                  <TableRow key={x.barcode}>
                    <TableCell>
                      {x.location}، {x.buildingAdress}
                    </TableCell>
                    <TableCell>{x.flatNumber}</TableCell>
                    <TableCell>{x.oldMeterNumber}</TableCell>
                    <TableCell>{x.oldMeterReading}</TableCell>
                    <TableCell>{x.newMeterNumber}</TableCell>
                    <TableCell>{x.barcode}</TableCell>
                    <TableCell>{x.meterType}</TableCell>
                    <TableCell>{x.installationType}</TableCell>
                    <TableCell>
                      {x.latitude}, {x.longitude}
                    </TableCell>
                    <TableCell>
                      {new Date(x.insertedIn).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{x.category}</TableCell>
                    <TableCell>{x.companyName}</TableCell>
                    <TableCell>{x.mainComapny}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MetersList;
