// TableEditButton.tsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  ThemeProvider,
  Select,
  MenuItem,
  InputLabel,
  Stack,
  FormControl,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import theme from '@/styles/Theme';
import axios from 'axios';
import MultipleSelect from '../BookCatalog/MultipleSelect';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '32px 32px 12px 32px',
  overflowY: 'auto',
  overflowX: 'hidden',
};

export default function TableEditButton({
  rowData,
  columns,
  genres,
  regions,
  locations,
  data,
}) {
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState(rowData);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    rowData['Genre(s)'].split(', ')
  );
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    rowData['Region(s)'].split(', ')
  );
  const [selectedLocation, setSelectedLocation] = useState<string>(
    rowData['Location']
  );
  const [buttonText, setButtonText] = useState<string>('Save');

  const genresList: string[] = genres.map((item) => item.name);
  const regionsList: string[] = regions.map((item) => item.name);
  const locationsList: string[] = locations.map((item) => item.name);

  useEffect(() => {
    setEditedData(rowData);
  }, [rowData]);

  useEffect(() => {
    console.log(editedData);
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    setButtonText('Saving...');
    const patchData = {
      barcodeId: editedData['Barcode ID'],
      title: editedData.Title,
      author: editedData.Author,
      genres: selectedGenres,
      regions: selectedRegions,
      location: selectedLocation,
    };
    const url =
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:3000'
        : 'http://localhost:3000';
    const response = await axios.patch(
      `${url}/api/books/${editedData.id}`,
      patchData
    );
    if (response.status === 200) {
      setButtonText('Success');
      setTimeout(() => {
        setButtonText('Save');
      }, 2000);
    } else {
      setButtonText('Error');
    }

    console.log(response);
  };

  const renderInputField = (field, value) => {
    const column = columns.find((col) => col.field === field);

    if (column) {
      return (
        <TextField
          key={field}
          id={field}
          name={field}
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
          id={field}
          name={field}
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

            <form onSubmit={handleEdit}>
              {renderInputField('Title', editedData.Title)}
              {renderInputField('Author', editedData.Author)}
              {renderInputField('Barcode ID', editedData['Barcode ID'])}

              <MultipleSelect
                selectedOptions={selectedGenres}
                setSelectedOptions={setSelectedGenres}
                options={genresList}
                label={'Genre(s)'}
              />
              <MultipleSelect
                selectedOptions={selectedRegions}
                setSelectedOptions={setSelectedRegions}
                options={regionsList}
                label={'Region(s)'}
              />
              <InputLabel id="location-select-label">Location</InputLabel>
              <Select
                id="location-select"
                value={selectedLocation}
                label="Location"
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locationsList.map((location) => {
                  return (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  );
                })}
              </Select>
              <Stack spacing={2} width={400}>
                <Typography>ID: {editedData.id}</Typography>
                <Typography>
                  Checked Out: {editedData['Checked Out'].toString()}
                </Typography>
                <Typography>
                  Checked Out By: {editedData['Checked Out By']}
                </Typography>
                <Typography>
                  Last Checked Out: {editedData['Last Checked Out']}
                </Typography>
              </Stack>
              <div style={{ textAlign: 'right' }}>
                <Button variant="contained" color="primary" type="submit">
                  {buttonText}
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
