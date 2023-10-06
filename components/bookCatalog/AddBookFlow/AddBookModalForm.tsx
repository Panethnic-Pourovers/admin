import { searchBookCatalogButton } from '@/components/BookCatalog/AddBookFlow/styles/addBookStyles';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import BookFoundModalForm from '@/components/BookCatalog/AddBookFlow/BookFoundModalForm';
import AddNewCopyOfBookForm from './AddNewCopyOfBookForm';

type addBookModalFormProps = {
  bookData: Record<string, any>;
};

const AddBookModalForm = (props: addBookModalFormProps) => {
  const [titleStateString, setTitle] = useState('');
  const [authorStateString, setAuthor] = useState('');

  const [showSearchCatalog, setShowSearchCatalog] = useState(false);
  const [showAddBookCatalog, setShowAddBookCatalog] = useState(false);
  const [hideStepOne, setHideStepOne] = useState(false);
  const [hideStepTwo, setHideStepTwo] = useState(true);
  const [foundBookId, setFoundBookId] = useState(null);

  const handleSearchBookCatalogButtonClick = (
    title: string,
    author: string
  ) => {
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
      setHideStepOne(true);
      setHideStepTwo(false);
    }
  };

  return (
    <>
      <Box
        id="addBookFormFlow-StepOne"
        sx={hideStepOne ? { display: 'none' } : { display: 'block' }}
      >
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
          onClick={() =>
            handleSearchBookCatalogButtonClick(
              titleStateString,
              authorStateString
            )
          }
          disableRipple
          variant="text"
          sx={searchBookCatalogButton}
        >
          Search book catalog
        </Button>
        {showSearchCatalog && <BookFoundModalForm foundBookId={foundBookId} />}
      </Box>
      <Box
        id="addBookFormFlow-stepTwo"
        sx={hideStepTwo ? { display: 'none' } : { display: 'block' }}
      >
        {showAddBookCatalog && <AddNewCopyOfBookForm />}
      </Box>
    </>
  );
};

export default AddBookModalForm;
