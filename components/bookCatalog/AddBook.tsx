import React, { useState } from 'react';
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

export default function AddBook({ bookData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showSearchCatalog, setSearchCatalog] = useState(false);
  const [showAddBookCatalog, setAddBookCatalog] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [foundBookId, setFoundBookId] = useState(null);

  const handleClick = (title: string, author: string) => {
    const booksArray = bookData.data.response;

    // Find a book that matches the entered title and author
    const bookFound = booksArray.find((book) => {
      return book.title === title && book.author === author;
    });

    if (bookFound) {
      setFoundBookId(bookFound.id);
      setSearchCatalog(true);
      setAddBookCatalog(false);
    } else {
      setFoundBookId(null);
      setAddBookCatalog(true);
      setSearchCatalog(false);
    }
  };

  const addBookStyle = {
    color: 'black',
    border: '1px solid black',
    '&:hover': {
      border: '1px solid black',
    },
  };

  const searchBookCatalogButton = {
    margin: '1rem 0',
    padding: '0',
    color: 'black',
    textDecoration: 'underline',
  };

  const showSearchCatalogStyle = {
    padding: '1rem',
    borderRadius: '0.4rem',
    backgroundColor: '#FFCC00',
    '& p': {
      margin: '0.5rem 0',
    },
    '& .MuiTextField-root': { m: 1, width: '25ch' },
  };

  const searchBookCatalogStyle = {
    color: 'black',
    border: '1px solid black',
    margin: '0.5rem 0',
    '&:hover': {
      border: '1px solid black',
    },
  };

  const genre = [
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

  const region = [
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

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button onClick={handleOpen} variant="outlined" sx={addBookStyle}>
          Add Book
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
              Add Book
            </Typography>
            <TextField
              id="title"
              label="Title"
              defaultValue=""
              variant="standard"
              style={{ margin: '0.5rem 0' }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="author"
              label="Author"
              defaultValue=""
              variant="standard"
              style={{ margin: '0.5rem 0' }}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <Button
              onClick={() => handleClick(title, author)}
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
                    {genre.map((option) => (
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
                    {region.map((option) => (
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
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
