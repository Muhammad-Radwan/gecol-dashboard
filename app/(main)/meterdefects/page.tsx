"use client";

import MyDatePicker from "@/components/MyDatePicker";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useFetchMeterDefect from "@/hooks/use-fetchmeterdefect";

import { useEffect, useState } from "react";

const MeterDefects = () => {
  const [date1, setDate1] = useState<Date>();
  const [date2, setDate2] = useState<Date>();

  useEffect(() => {
    setDate1(new Date());
    setDate2(new Date());
  }, []);

  const { meterDefects } = useFetchMeterDefect(
    date1 ?? new Date(),
    date2 ?? new Date()
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">

      

      <h1 className="text-4xl mb-10">
        تقرير الشوائب والمسح على مستوى إدارة سهل بنغازي
      </h1>

      

      <div className="mb-10 flex flex-column">
        <h1 className="ml-2">من التاريخ</h1>
        <MyDatePicker
          selectedDate={date1}
          onDateChange={setDate1}
          placeholder="من التاريخ"
        />
        <h1 className="ml-2">إلى التاريخ</h1>
        <MyDatePicker
          selectedDate={date2}
          onDateChange={setDate2}
          placeholder="إلى التاريخ"
        />
      </div>


      <div className="mb-10 flex flex-column">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead  className="text text-center border-1 border-gray-500">الدائرة</TableHead>
              <TableHead className="text text-center border-1 border-gray-500">جيد</TableHead>
              <TableHead className="text text-center border-1 border-gray-500">ربط مباشر</TableHead>
              <TableHead className="text text-center border-1 border-gray-500">عداد عاطل</TableHead>
              <TableHead className="text text-center border-1 border-gray-500">غير مطابق للمواصفات</TableHead>
              <TableHead className="text text-center border-1 border-gray-500">توصيلة عكسية</TableHead>
              <TableHead className="text text-center border-1 border-gray-500">يوجد اختلاس</TableHead>
              <TableHead className="text text-center border-1 border-gray-500">لم يتم التركيب</TableHead>
              <TableHead className="text text-center border-1 border-gray-500">غير محمل</TableHead>
              <TableHead className="text text-center border-1 border-gray-500">مشكلة في الاتصالات</TableHead>
              <TableHead className="text text-center border-1 border-gray-500">الإجمالي</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!meterDefects?.length ? (
              <TableRow>
                <TableCell className="text-center text-xl" colSpan={13}>
                  لا توجد نتائج
                </TableCell>
              </TableRow>
            ) : (
              meterDefects?.map((x) => (
                <TableRow key={x.companyName}>
                  <TableCell className="text-center font-bold border-1 border-gray-500 text-xl">{x.companyName}</TableCell>
                  <TableCell className="text-center font-bold border-1 border-gray-500 text-xl">{x.statusCode01}</TableCell>
                  <TableCell className="text-center font-bold border-1 border-gray-500 text-xl">{x.statusCode02}</TableCell>
                  <TableCell className="text-center font-bold border-1 border-gray-500 text-xl">{x.statusCode03}</TableCell>
                  <TableCell className="text-center font-bold border-1 border-gray-500 text-xl">{x.statusCode04}</TableCell>
                  <TableCell className="text-center font-bold border-1 border-gray-500 text-xl">{x.statusCode05}</TableCell>
                  <TableCell className="text-center font-bold border-1 border-gray-500 text-xl">{x.statusCode06}</TableCell>
                  <TableCell className="text-center font-bold border-1 border-gray-500 text-xl">{x.statusCode07}</TableCell>
                  <TableCell className="text-center font-bold border-1 border-gray-500 text-xl">{x.statusCode08}</TableCell>
                  <TableCell className="text-center font-bold border-1 border-gray-500 text-xl">{x.statusCode09}</TableCell>
                  <TableCell className="text-center font-bold border-1 border-gray-500 text-xl">{x.total}</TableCell>
                 
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        
      </div>

    </div>
  );
};

export default MeterDefects;
