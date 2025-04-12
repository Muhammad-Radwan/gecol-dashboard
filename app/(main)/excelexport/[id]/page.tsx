"use client";
import { Button } from "@/components/ui/button";
import useFetchAllmeters from "@/hooks/use-fetchallmeters";
import useFetchMeterCsByCompany from "@/hooks/use-fetchmetercsbycompany";
import { ExportExcel } from "@/lib/ExportExcel";
import * as XLSX from "xlsx";

import { useParams } from "next/navigation";
import { ExportExcelMeterCs } from "@/lib/ExportExcelMeterCs";

const ExcelExport = () => {
  const id = useParams().id as string;

  const { isLoading, meters } = useFetchAllmeters(id);
  const { metercs } = useFetchMeterCsByCompany(id);

  const exportToExcel = (data: String[]) => {
    // Convert the data to a worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "الحصر");

    // Export the file
    XLSX.writeFile(wb, "بيانات الحصر.xlsx");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isLoading && <h1>is loading...</h1>}
      <h1 className="text-3xl mb-10">تصدير إكسل</h1>

      <div className="mb-10 items-center space-x-3">
        <Button onClick={() => ExportExcel(meters || [])}>
          تصدير بيانات التركيبات
        </Button>
        <Button onClick={() => ExportExcelMeterCs(metercs || [])}>تصدير بيانات الحصر</Button>
      </div>
    </div>
  );
};

export default ExcelExport;
