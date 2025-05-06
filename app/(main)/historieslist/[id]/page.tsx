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

import useFetchHistories from "@/hooks/use-fetchhistories";
import { codeToHistoryState } from "@/lib/CodeToHistoryState";
import { ExportMeterHistoryToExcel } from "@/lib/ExportMeterHistoryToExcel";
import { IsDoneToString } from "@/lib/IsDoneToString";

import { useParams } from "next/navigation";
import { useState } from "react";

const HistoriesList = () => {
  const id = useParams().id as string;
  const [page, setPage] = useState(1);
  const { meters } = useFetchHistories(id, page);
  return (
    <div>
      <h1 className="text-2xl">قائمة البلاغات</h1>
      <Button onClick={() => ExportMeterHistoryToExcel(meters || [])}>Excel</Button>
      <div className="space-y-4">
        <div className="flex items-center">
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
                <TableHead className="text-center">الفني أو القارئ</TableHead>
                <TableHead className="text-center">رقم الشباك</TableHead>
                <TableHead className="text-center">القسم</TableHead>
                <TableHead className="text-center">الباركود</TableHead>
                <TableHead className="text-center">موقع التركيب</TableHead>
                <TableHead className="text-center">العنوان</TableHead>
                <TableHead className="text-center">الاحداثيات</TableHead>
                <TableHead className="text-center">الملاحظات</TableHead>
                <TableHead className="text-center">تاريخ البلاغ</TableHead>
                <TableHead className="text-center">نوع البلاغ</TableHead>
                <TableHead className="text-center">تاريخ التسوية</TableHead>
                <TableHead className="text-center">تاريخ التركيب</TableHead>
                <TableHead className="text-center">حالة التسوية</TableHead>
                <TableHead className="text-center">الشباك</TableHead>
                <TableHead className="text-center">الدائرة</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {!meters?.length ? (
                <TableRow>
                  <TableCell className="text-center text-xl" colSpan={13}>
                    لا توجد نتائج
                  </TableCell>
                </TableRow>
              ) : (
                meters?.map((x) => (
                  <TableRow key={x.cardGuide}>
                    <TableCell className="text-center">
                      {x.employeeName}
                    </TableCell>

                    <TableCell className="text-center">{x.vendorId}</TableCell>

                    <TableCell className="text-center">
                      {x.vendorName}
                    </TableCell>

                    <TableCell className="text-center">{x.barcode}</TableCell>

                    <TableCell className="text-center">
                      {x.locationName}
                    </TableCell>

                    <TableCell className="text-center">
                      {x.buildingAdress}
                    </TableCell>

                    <TableCell className="text-center">
                      {x.longitude}, {x.latitude}
                    </TableCell>

                    <TableCell className="text-center">
                      {x.statusDescription}
                    </TableCell>

                    <TableCell className="text-center">
                      {new Date(x.insertedIn).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-center">
                      {codeToHistoryState(x.statusCode)}
                    </TableCell>

                    <TableCell className="text-center">
                      {new Date(x.doneDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-center">
                      {new Date(x.updatedIn).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-center">
                      {IsDoneToString(x.isDone)}
                    </TableCell>

                    <TableCell className="text-center">
                      {x.installationWindow}
                    </TableCell>

                    <TableCell className="text-center">
                      {x.mainCompany}
                    </TableCell>
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

export default HistoriesList;

{
  /* <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">الملاحظات</TableHead>
                <TableHead className="text-center">تاريخ البلاغ</TableHead>
                <TableHead className="text-center">نوع البلاغ</TableHead>
                <TableHead className="text-center">تاريخ التسوية</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {!meters?.length ? (
                <TableRow>
                  <TableCell className="text-center text-xl" colSpan={13}>
                    لا توجد نتائج
                  </TableCell>
                </TableRow>
              ) : (
                meters?.map((x) => (
                  <TableRow key={x.cardGuide}>
                    <TableCell>{x.statusDescription}</TableCell>
                    <TableCell>{x.insertedIn}</TableCell>
                    <TableCell>{x.statusCode}</TableCell>
                    <TableCell>{x.doneDate}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table> */
}
