import ExcelJS from 'exceljs';
export async function ExportExcelMeterCs(data: Record<string, string>[]) {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("بيانات الحصر");
    const headers = Object.keys(data[0])
    const rows = data.map(row => headers.map(h => row[h]))


    // Add the table
    ws.addTable({
        name: 'ArabicTable',
        ref: 'A1',
        headerRow: true,
        style: {
            theme: 'TableStyleLight19', // ✅ use any built-in table style here
            showRowStripes: true,
        },
        columns: headers.map(h => ({ name: h })),
        rows: rows,
    });

    // Auto-fit column widths
    headers.forEach((header, i) => {
        const column = ws.getColumn(i + 1);
        const lengths = [header.length, ...data.map(row => String(row[header]).length)];
        const maxLength = Math.max(...lengths);
        column.width = maxLength + 2;
    });

    // Optional: Right-to-left layout
    ws.views = [{ rightToLeft: true }];

    // Export to file
    const buffer = await wb.xlsx.writeBuffer();
            
    // Trigger download
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "بيانات الحصر.xlsx";
    link.click();
}