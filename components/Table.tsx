import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


export default function Table(props) {
  const {rows, columns} = props;

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 5, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        autoHeight
      />
    </div>
  );
}