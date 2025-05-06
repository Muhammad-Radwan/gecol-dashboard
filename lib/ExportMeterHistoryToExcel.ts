import ExcelJS from "exceljs";
import { MeterHistoryType } from "./MeterHistoryType";


export async function ExportMeterHistoryToExcel(data: MeterHistoryType[]) {
    
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("البلاغات");
       
        // columns
        worksheet.columns = [
          { header: "الفني/القارئ", key: "employeeName", width: 30 },
          { header: "رقم الشباك", key: "vendorId", width: 30 },
          { header: "القسم", key: "vendorName", width: 30 },
          { header: "الباركود", key: "barcode", width: 30 },
          { header: "موقع التركيب", key: "locationName", width: 30 },
          { header: "العنوان", key: "buildingAdress", width: 30 },
          { header: "x", key: "latitude", width: 30 },
          { header: "y", key: "longitude", width: 30 },
          { header: "الملاحظات", key: "statusDescription", width: 30 },
          { header: "تاريخ البلاغ", key: "insertedIn", width: 30 },
          { header: "نوع البلاغ", key: "statusCode", width: 30 },
          { header: "تاريخ التسوية", key: "doneDate", width: 30 },
          { header: "تاريخ التركيب", key: "doneeDate", width: 30 },
          { header: "حالة التسوية", key: "isDone", width: 30 },
          { header: "الشباك", key: "installationWindow", width: 30 },
          { header: "الدائرة", key: "mainCompany", width: 30 },
        ];
    
        // add rows
        data.forEach((meter) => {
          worksheet.addRow({
            employeeName: meter.employeeName,
            vendorId: meter.vendorId,
            vendorName: meter.vendorName,
            barcode: meter.barcode,
            locationName: meter.locationName,
            buildingAdress: meter.buildingAdress,
            latitude: meter.latitude,
            longitude: meter.longitude,
            statusDescription: meter.statusDescription,
            insertedIn: meter.insertedIn,
            statusCode: meter.statusCode,
            doneDate: meter.doneDate,
            doneeDate: meter.doneDate,
            isDone: meter.isDone,
            installationWindow: meter.installationWindow,
            mainCompany: meter.mainCompany,
          });
        });
    
        // Add a table (like Excel structured table)
        // worksheet.addTable({
        //   name: "MyTable",
        //   ref: "A1",
        //   headerRow: true,
        //   totalsRow: false,
        //   style: {
        //     theme: "TableStyleLight19",
        //   },
        //   columns: [
        //     { name: "الموقع" },
        //     { name: "العنوان" },
        //     { name: "رقم الشقة" },
        //     { name: "رقم العداد القديم" },
        //     { name: "القراءة" },
        //     { name: "رقم العداد الجديد" },
        //     { name: "الباركود" },
        //     { name: "نوع العداد" },
        //     { name: "الشركة المصنعة" },
        //     { name: "نوع التركيب" },
        //     { name: "x" },
        //     { name: "y" },
        //     { name: "رقم الهاتف" },
        //     { name: "اسم الموظف" },
        //     { name: "تاريخ التركيب" },
        //     { name: "نوع العداد" },
        //     { name: "اسم الشركة" },
        //     { name: "الشركة الرئيسية" },
        //   ],
        //   rows: data.map((meter) => [
        //     meter.location,
        //     meter.buildingAdress,
        //     meter.flatNumber,
        //     meter.oldMeterNumber,
        //     meter.oldMeterReading,
        //     meter.newMeterNumber,
        //     meter.barcode,
        //     meter.meterType,
        //     meter.manufacturer,
        //     meter.installationType,
        //     meter.latitude,
        //     meter.longitude,
        //     meter.phoneNumber,
        //     meter.employeeName,
        //     meter.insertedIn,
        //     meter.category,
        //     meter.companyName,
        //     meter.mainComapny,
        //   ]),
        // });
    
        worksheet.views = [{ rightToLeft: true }];
        // Export to file
        const buffer = await workbook.xlsx.writeBuffer();
    
        // Trigger download
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "بيانات البلاغات.xlsx";
        link.click();
}