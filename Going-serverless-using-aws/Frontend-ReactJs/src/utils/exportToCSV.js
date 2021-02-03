import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const fileType = 'data:text/csv;charset=UTF-8';
const fileExtension = '.csv';
export const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const filebuffer = XLSX.utils.sheet_to_csv(ws);
    const data = new Blob([filebuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
}