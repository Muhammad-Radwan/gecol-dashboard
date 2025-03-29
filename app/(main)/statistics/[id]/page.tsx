"use client";
import DataCardsContainerDate from "@/components/DataCardsContainerDate";
import { MetersChartDate } from "@/components/MetersPieChartDate";
import MyDatePicker from "@/components/MyDatePicker";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const Statistics = () => {
  const params = useParams();
  const compId = params.id?.toString();
  const [date1, setDate1] = useState<Date>();
  const [date2, setDate2] = useState<Date>();

  useEffect(() => {
    setDate1(new Date());
    setDate2(new Date());

    console.log(`my date: ${date1?.toLocaleString()}`);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-10">إجمالي التركيبات حسب النوع</h1>
      <div className="mb-10 items-center">
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

      <div className="mb-10">
        <DataCardsContainerDate
          companyGuid={compId ?? "null"}
          d1={date1 ?? new Date()}
          d2={date2 ?? new Date()}
        />
      </div>

      <MetersChartDate
        companyGuid={compId ?? "null"}
        d1={date1 ?? new Date()}
        d2={date2 ?? new Date()}
      />
    </div>
  );
};

export default Statistics;
