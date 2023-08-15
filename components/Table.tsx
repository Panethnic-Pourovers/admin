import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import jsonData from '../dummyData.json';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'UUID', width: 200 },
  { field: 'title', headerName: 'Book Title', width: 400 },
  { field: 'author', headerName: 'Author', width: 200 },
  { field: 'genres', headerName: 'Genre(s)', width: 200 },
  { field: 'regions', headerName: 'Region(s)', width: 200 },
  { field: 'location', headerName: 'Location', width: 200 },
  { field: 'member', headerName: 'Member', width: 200 },
  { field: 'lastCheckedOut', headerName: 'Last Checked Out', width: 200 },
];

export default function BookCatalog() {
  const rows = jsonData.data.response;

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