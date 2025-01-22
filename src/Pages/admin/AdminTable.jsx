import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

// const AdminTable = ({ data, columns, actions }) => {
//   return (
//     <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%" }}>
//       <thead>
//         <tr>
//           {columns && columns.map((col, index) => (
//             <th key={index}>{col.label}</th>
//           ))}
//           {actions && <th>Actions</th>}
//         </tr>
//       </thead>
//       <tbody>
//         {data && data.length > 0 ? (
//           data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {columns.map((col, colIndex) => (
//                 <td key={colIndex}>{row[col.field]}</td>
//               ))}
//               {actions && (
//                 <td>
//                   {actions.map((action, actionIndex) => (
//                     <button
//                       key={actionIndex}
//                       onClick={() => action.onClick(row)}
//                       style={{ marginRight: "10px" }}
//                     >
//                       {action.label}
//                     </button>
//                   ))}
//                 </td>
//               )}
//             </tr>
//           ))
//         ) : (
//             <tr>
//               <td colSpan={columns && columns.length + (actions ? 1 : 0)} style={{ textAlign: "center" }}>
//                 No data available
//               </td>
//             </tr>
//         )}
//       </tbody>
//     </table>
//   );
// };

const AdminTable = ({ data, columns, actions }) => {
  const rowsWithIds = data && data.map((row, index) => ({
    ...row,
    id: row._id || Math.round(), 
  }));
  // console.log('rowsWithIds', rowsWithIds);
  // console.log('actions', actions);
  // console.log('column', columns);
  
  const enhancedColumns = [
    ...columns.map((col) => ({ field: col.field, headerName: col.label, flex: 1 })),
    ...(actions
      ? [
          {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
              <div style={{ display: "block", gap: "0px" }}>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={() => action.onClick(params.row)}
                    style={{
                      padding: "5px",
                      backgroundColor: action.color,
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "4px",
                      marginBottom:"5px",
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div style={{ height: 400, width:"auto"}}>
      <DataGrid
        rows={rowsWithIds}
        columns={enhancedColumns}
        pageSize={5}
        style={{padding:"5px"}}
        rowsPerPageOptions={[5, 10, 20]}
        width={200}
      />
    </div>
  );
};
export default AdminTable;
