// React import
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

// datagrid dependency imports
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Modal, Button } from '@mui/material';

type tableProps = {
  rows: Record<string, unknown>[];
  columns: GridColDef[];
  page?: number;
  pageSize?: number;
};

export default function Table(props: tableProps) {
  const { rows, columns, page, pageSize } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<Record<string, unknown> | null>(null);

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

  const handleRowClick = (params: any) => {
    setSelectedRowData(params.row);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedRowData(null);
    setIsModalOpen(false);
  };

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
        onRowClick={handleRowClick}
      />

      <Modal open={isModalOpen} onClose={handleClose}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '25px 40px',
            borderRadius: '4px',
            width: '80%', 
            maxWidth: '400px',
          }}
        >
          {selectedRowData && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: '0px',
                }}
              >
                <Button
                  onClick={handleClose}
                  sx={{
                    color: 'black',
                    boxShadow: 'none',
                    position: 'absolute',
                    top: '0px',
                    right: '-5px',
                    padding: 0,
                  }}
                >
                  <CloseIcon />
                </Button>
              </div>
              <h2>{selectedRowData.title}</h2>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {Object.entries(selectedRowData).map(([key, value]) => {
                  if (key !== 'title' && key !== 'availability') {
                    return (
                      <li key={key} style={{ marginBottom: '8px' }}>
                        <span style={{ fontWeight: 'bold' }}>{key}:</span> {value}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          )}

          <div style={{ textAlign: 'right' }}>
            <Button variant="outlined" color="error" style={{ marginLeft: '8px' }}>
              Delete
            </Button>
            <Button variant="contained">
              Edit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
