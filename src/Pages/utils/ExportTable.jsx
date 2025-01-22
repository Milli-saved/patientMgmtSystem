import React from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

const ExportTable = ({ data, columns, fileName }) => {
  const newdata = data && data.map(({ _id, password, token,__v, ...rest }) => rest);
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(newdata);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TableData');
    XLSX.writeFile(workbook, `${fileName || 'export'}.xlsx`);
  };
  return (
    <Button variant="outlined" onClick={handleExport}>
      Export to Excel
    </Button>
  );
};

export default ExportTable;
