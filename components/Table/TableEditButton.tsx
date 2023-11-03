// TableEditButton.tsx

import React, { useState, useEffect, useContext } from 'react';
import { BooksContext, formatDate } from '@/pages/books';
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
  setRowData,
  columns,
  genres,
  regions,
  locations,
}) {
  const { data, setData } = useContext(BooksContext);

  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState(rowData);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    rowData['Genre(s)']?.split(', ')
  );
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    rowData['Region(s)']?.split(', ')
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    const listOfBlanks = [];
    if (editedData['Barcode ID'] === '') {
      listOfBlanks.push('barcode');
    }
    if (editedData.Title === '') {
      listOfBlanks.push('title');
    }
    if (editedData.Author === '') {
      listOfBlanks.push('author');
    }
    if (listOfBlanks.length > 0) {
      setErrorMessage(
        `The following fields cannot be blank: ${listOfBlanks.join(', ')}`
      );
      return;
    }

    // if barcode exists in the data, AND the barcode does not equal the selected row's barcode.....
    const duplicateBarcode = data.filter(
      (item) => item['Barcode ID'] === editedData['Barcode ID']
    );
    if (
      duplicateBarcode.length > 0 &&
      editedData['Barcode ID'] !== rowData['Barcode ID']
    ) {
      setErrorMessage('This barcode already exists.');
      return;
    }
    const filteredData = data.filter((item) => item.id !== rowData.id);

    setButtonText('Saving...');
    const patchData = {
      barcodeId: editedData['Barcode ID'],
      title: editedData.Title,
      author: editedData.Author,
      genres: selectedGenres.filter((item) => item !== ''),
      regions: selectedRegions.filter((item) => item !== ''),
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
      const toUpdate = [response.data].map((book) => {
        return {
          id: book.id,
          Title: book.title,
          Author: book.author,
          Genres: book.genres,
          Regions: book.regions,
          'Genre(s)': book.genres.map((genre) => genre.name).join(', '),
          'Regions(s)': book.regions.map((region) => region.name).join(', '),
          'Checked Out': book.checkedOut,
          'Checked Out By': rowData['Checked Out By'],
          'Last Checked Out': formatDate(book.lastCheckedOut),
          Location: book.location.name,
          'Barcode ID': book.barcodeId,
        };
      });
      setData([...filteredData, toUpdate[0]]);
      setRowData(toUpdate[0]);
      setButtonText('Success');
      setErrorMessage(null);
      setTimeout(() => {
        setButtonText('Save');
      }, 1000);
    } else {
      setButtonText('Error');
    }
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
              {errorMessage ? (
                <Typography color="error">{errorMessage}</Typography>
              ) : (
                <></>
              )}
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
