// React import
import React from 'react';

// datagrid dependency imports
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// proptypes
type tableProps = {
  rows: Record<string, unknown>[],
  columns: GridColDef[],
  page?: number
  pageSize?: number
}

export default function Table(props: tableProps) {
  const {rows, columns, page, pageSize } = props;

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: page || 5, pageSize: pageSize || 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        autoHeight
      />
    </div>
  );
}