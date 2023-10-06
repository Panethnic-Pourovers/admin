import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import {
  searchBookCatalogButton,
  searchBookCatalogStyle,
  showSearchCatalogStyle,
} from './styles/addBookStyles';

const genres = [
  {
    value: 'Action',
    label: 'Action',
  },
  {
    value: 'Comedy',
    label: 'Comedy',
  },
  {
    value: 'History',
    label: 'History',
  },
  {
    value: 'Romance',
    label: 'Romance',
  },
];

const regions = [
  {
    value: 'China',
    label: 'China',
  },
  {
    value: 'India',
    label: 'India',
  },
  {
    value: 'Japan',
    label: 'Japan',
  },
  {
    value: 'Philippines',
    label: 'Philippines',
  },
  {
    value: 'Vietnam',
    label: 'Vietnam',
  },
  {
    value: 'South Korea',
    label: 'South Korea',
  },
];

type addBookModalFormProps = {
  bookData: Record<string, any>;
};

const AddBookModalForm = (props: addBookModalFormProps) => {
  const [titleStateString, setTitle] = useState('');
  const [authorStateString, setAuthor] = useState('');
  const [showSearchCatalog, setShowSearchCatalog] = useState(false);
  const [showAddBookCatalog, setShowAddBookCatalog] = useState(false);
  const [foundBookId, setFoundBookId] = useState(null);

  const handleClick = (title: string, author: string) => {
    const { data } = props.bookData;
    if (!data) return;
    const booksArray = props.bookData.data.response;

    // Find a book that matches the entered title and author
    const bookFound = booksArray.find((book) => {
      return book.title === title && book.author === author;
    });

    if (bookFound) {
      setFoundBookId(bookFound.id);
      setShowSearchCatalog(true);
      setShowAddBookCatalog(false);
    } else {
      setFoundBookId(null);
      setShowAddBookCatalog(true);
      setShowSearchCatalog(false);
    }
  };

  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h5"
        component="h2"
        sx={{ fontWeight: 'bold' }}
      >
        Add Book
      </Typography>
      <TextField
        id="title"
        label="Title"
        defaultValue=""
        variant="standard"
        style={{ margin: '0.5rem 0' }}
        value={titleStateString}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="author"
        label="Author"
        defaultValue=""
        variant="standard"
        style={{ margin: '0.5rem 0' }}
        value={authorStateString}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <Button
        onClick={() => handleClick(titleStateString, authorStateString)}
        disableRipple
        variant="text"
        sx={searchBookCatalogButton}
      >
        Search book catalog
      </Button>
      {showSearchCatalog && (
        <Box sx={showSearchCatalogStyle}>
          <p>Book found in catalog</p>
          <p>Book ID: {foundBookId}</p>
          <Button variant="outlined" sx={searchBookCatalogStyle}>
            Add new copy
          </Button>
        </Box>
      )}
      {showAddBookCatalog && (
        <Box
          component="form"
          sx={showSearchCatalogStyle}
          noValidate
          autoComplete="off"
        >
          <p>Book not found in catalog</p>
          <div>
            <TextField
              id="standard-select-currency-native"
              select
              label="Genre"
              defaultValue=""
              SelectProps={{
                native: true,
              }}
              variant="standard"
            >
              {genres.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              id="standard-select-currency-native"
              select
              label="Region"
              defaultValue=""
              SelectProps={{
                native: true,
              }}
              variant="standard"
            >
              {regions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <Button variant="outlined" sx={searchBookCatalogStyle}>
              Add new book
            </Button>
          </div>
        </Box>
      )}
    </>
  );
};

export default AddBookModalForm;
