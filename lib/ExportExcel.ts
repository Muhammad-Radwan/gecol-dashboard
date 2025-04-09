import ExcelJS from "exceljs";
import { MeterListType } from "./MetersListType";

export async function ExportExcel(data: MeterListType[]) {
    
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("العدادات");
       
        // columns
        worksheet.columns = [
          { header: "الموقع", key: "location", width: 30 },
          { header: "العنوان", key: "buildingAdress", width: 30 },
          { header: "رقم الشقة", key: "flatNumber", width: 30 },
          { header: "رقم العداد القديم", key: "oldMeterNumber", width: 30 },
          { header: "القراءة", key: "oldMeterReading", width: 30 },
          { header: "رقم العداد الجديد", key: "newMeterNumber", width: 30 },
          { header: "الباركود", key: "barcode", width: 30 },
          { header: "نوع العداد", key: "meterType", width: 30 },
          { header: "الشركة المصنعة", key: "manufacturer", width: 30 },
          { header: "نوع التركيب", key: "installationType", width: 30 },
          { header: "X", key: "latitude", width: 30 },
          { header: "Y", key: "longitude", width: 30 },
          { header: "رقم الهاتف", key: "phoneNumber", width: 30 },
          { header: "اسم الموظف", key: "employeeName", width: 30 },
          { header: "تاريخ التركيب", key: "insertedIn", width: 30 },
          { header: "نوع العداد", key: "category", width: 30 },
          { header: "اسم الشركة", key: "companyName", width: 30 },
          { header: "الشركة الرئيسية", key: "mainCompany", width: 30 },
        ];
    
        // add rows
        data.forEach((meter) => {
          worksheet.addRow({
            location: meter.location,
            buildingAdress: meter.buildingAdress,
            flatNumber: meter.flatNumber,
            oldMeterNumber: meter.oldMeterNumber,
            oldMeterReading: meter.oldMeterReading,
            newMeterNumber: meter.newMeterNumber,
            barcode: meter.barcode,
            meterType: meter.meterType,
            manufacturer: meter.manufacturer,
            installationType: meter.installationType,
            latitude: meter.latitude,
            longitude: meter.longitude,
            phoneNumber: meter.phoneNumber,
            employeeName: meter.employeeName,
            insertedIn: meter.insertedIn,
            category: meter.category,
            companyName: meter.companyName,
            mainComapny: meter.mainComapny,
          });
        });
    
        // Add a table (like Excel structured table)
        worksheet.addTable({
          name: "MyTable",
          ref: "A1",
          headerRow: true,
          totalsRow: false,
          style: {
            theme: "TableStyleLight19",
          },
          columns: [
            { name: "الموقع" },
            { name: "العنوان" },
            { name: "رقم الشقة" },
            { name: "رقم العداد القديم" },
            { name: "القراءة" },
            { name: "رقم العداد الجديد" },
            { name: "الباركود" },
            { name: "نوع العداد" },
            { name: "الشركة المصنعة" },
            { name: "نوع التركيب" },
            { name: "x" },
            { name: "y" },
            { name: "رقم الهاتف" },
            { name: "اسم الموظف" },
            { name: "تاريخ التركيب" },
            { name: "نوع العداد" },
            { name: "اسم الشركة" },
            { name: "الشركة الرئيسية" },
          ],
          rows: data.map((meter) => [
            meter.location,
            meter.buildingAdress,
            meter.flatNumber,
            meter.oldMeterNumber,
            meter.oldMeterReading,
            meter.newMeterNumber,
            meter.barcode,
            meter.meterType,
            meter.manufacturer,
            meter.installationType,
            meter.latitude,
            meter.longitude,
            meter.phoneNumber,
            meter.employeeName,
            meter.insertedIn,
            meter.category,
            meter.companyName,
            meter.mainComapny,
          ]),
        });
    
        // Export to file
        const buffer = await workbook.xlsx.writeBuffer();
    
        // Trigger download
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.xlsx";
        link.click();
      
}