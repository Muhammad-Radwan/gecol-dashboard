"use client";
import MyDatePicker from "@/components/MyDatePicker";
import { Button } from "@/components/ui/button";
import useFetchAllmeters from "@/hooks/use-fetchallmeters";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ExcelExport = () => {
  const params = useParams();
  const [date1, setDate1] = useState<Date>();
  const [date2, setDate2] = useState<Date>();
  const {isLoading, error, meters} = useFetchAllmeters(params.id?.toString() || '')

  useEffect(() => {
    setDate1(new Date());
    setDate2(new Date());
    console.log(`my date: ${date1?.toLocaleString()}`);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-10">تصدير إكسل</h1>

      <div className="mb-5 items-center">
        <MyDatePicker
          selectedDate={date1}
          onDateChange={setDate1}
          placeholder="من التاريخ"
        />
        <MyDatePicker
          selectedDate={date2}
          onDateChange={setDate2}
          placeholder="إلى التاريخ"
        />
      </div>

      <div className="mb-10 items-center space-x-3">
        <Button>تصدير الكل</Button>
        <Button>تصدير حسب الفترة</Button>
      </div>

     
    </div>
  );
};

export default ExcelExport;
