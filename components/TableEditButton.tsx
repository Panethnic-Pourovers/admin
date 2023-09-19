// TableEditButton.tsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  ThemeProvider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import theme from '@/styles/Theme';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '32px 32px 12px 32px',
};

export default function TableEditButton({ rowData, columns }) {
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState(rowData);

  useEffect(() => {
    setEditedData(rowData);
  }, [rowData]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = () => {
    handleClose();
  };

  const renderInputField = (field, value) => {
    const column = columns.find((col) => col.field === field);

    if (column) {
      return (
        <TextField
          key={field}
          label={column.headerName}
          value={value}
          onChange={(e) =>
            setEditedData({ ...editedData, [field]: e.target.value })
          }
          fullWidth
          margin="normal"
        />
      );
    } else {
      return (
        <TextField
          key={field}
          label={field}
          value={value}
          onChange={(e) =>
            setEditedData({ ...editedData, [field]: e.target.value })
          }
          fullWidth
          margin="normal"
        />
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button onClick={handleOpen} variant="contained">
          Edit
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
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
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ fontWeight: 'bold' }}
            >
              Edit Book
            </Typography>
            {Object.entries(editedData).map(([key, value]) => {
              if (key !== 'id' && key !== 'availability') {
                return renderInputField(key, value);
              }
              return (
                <Typography key={key}>
                  {key}: {value}
                </Typography>
              );
            })}
            <div style={{ textAlign: 'right' }}>
              <Button onClick={handleEdit} variant="contained" color="primary">
                Save
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
