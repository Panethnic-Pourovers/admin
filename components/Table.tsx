// React import
import React from 'react';

// datagrid dependency imports
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// proptypes
type tableProps = {
  rows: Record<string, unknown>[];
  columns: GridColDef[];
  page?: number;
  pageSize?: number;
};

export default function Table(props: tableProps) {
  const { rows, columns, page, pageSize } = props;

  const renderAvailabilityColumn = (params: any) => {
    const availability = params.value as boolean;
    return (
      <div style={{ color: availability ? 'green' : 'red' }}>
        {availability ? '✔ Available' : '✘ Checked Out'}
      </div>
    );
  };

  const updatedColumns = columns.map((column) => {
    if (column.field === 'availability') {
      return {
        ...column,
        renderCell: renderAvailabilityColumn,
      };
    }
    return column;
  });

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={updatedColumns}
        initialState={{
          pagination: {
            paginationModel: { page: page || 0, pageSize: pageSize || 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        autoHeight
      />
    </div>
  );
}
