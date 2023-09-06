import React from 'react';
import { DataGrid, GridColDef, GridOverlay } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';

type tableProps = {
  rows: Record<string, unknown>[];
  columns: GridColDef[];
  page?: number;
  pageSize?: number;
};

const CustomNoRowsOverlay = () => {
  return (
    <GridOverlay>
      <CircularProgress />
      <div style={{ margin: '5px' }}>Book Catalog is loading</div>
    </GridOverlay>
  );
};

export default function Table(props: tableProps) {
  const { rows, columns, page, pageSize } = props;

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: page || 0, pageSize: pageSize || 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        autoHeight
        slots={{
          noRowsOverlay: CustomNoRowsOverlay
        }}
      />
    </div>
  );
}
