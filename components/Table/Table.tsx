/* eslint-disable @typescript-eslint/no-explicit-any */
// React import
import TableEditButton from '@/components/Table/TableEditButton';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';

// datagrid dependency imports
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Button, Modal } from '@mui/material';
import axios from 'axios';

type tableProps = {
  rows: Record<string, unknown>[];
  columns: GridColDef[];
  page?: number;
  pageSize?: number;
  genres: { id; name };
  regions: { id; name };
  locations: string;
  data: any;
  setData;
};

export default function Table(props: tableProps) {
  const {
    rows,
    columns,
    page,
    pageSize,
    genres,
    regions,
    locations,
    data,
    setData,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteButtonText, setDeleteButtonText] = useState<string>('Delete');
  const [selectedRowData, setSelectedRowData] = useState<Record<
    string,
    unknown
  > | null>(null);

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

  const handleDelete = async () => {
    setDeleteButtonText('Deleting...');
    // disable delete button
    const url =
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:3000'
        : 'http://localhost:3000';
    const res = await axios.delete(`${url}/api/books/${selectedRowData.id}`);
    if (res.status === 200) {
      setData(data.filter((item) => item.id !== selectedRowData.id));
      setIsModalOpen(false);
      setDeleteButtonText('Delete');
    } else {
      setDeleteButtonText('Failed');
      setTimeout(() => {
        setDeleteButtonText('Delete');
      }, 1000);
    }
  };

  const convertValue = (value: any): string => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return value?.toString();
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
                  if (
                    key !== 'title' &&
                    key !== 'Genres' &&
                    key !== 'Regions'
                  ) {
                    return (
                      <li key={key} style={{ marginBottom: '8px' }}>
                        <span style={{ fontWeight: 'bold' }}>{key}:</span>{' '}
                        {convertValue(value)}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          )}

          <div style={{ textAlign: 'right' }}>
            <Button
              variant="outlined"
              color="error"
              style={{ marginLeft: '8px' }}
              onClick={handleDelete}
            >
              {deleteButtonText}
            </Button>
            <Button>
              <TableEditButton
                rowData={selectedRowData}
                setRowData={setSelectedRowData}
                columns={columns}
                genres={genres}
                regions={regions}
                locations={locations}
              />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
