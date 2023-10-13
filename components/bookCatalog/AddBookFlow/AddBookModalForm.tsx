import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { searchBookCatalogButton } from './styles/addBookStyles';

import AddNewCopyOfBookForm from './AddNewCopyOfBookForm';
import BookFoundModalForm from './BookFoundModalForm';

type addBookModalFormProps = {
  bookData: Record<string, any>;
};

const AddBookModalForm = (props: addBookModalFormProps) => {
  const [titleStateString, setTitleStateString] = useState('');
  const [authorStateString, setAuthorStateString] = useState('');

  const [showSearchCatalog, setShowSearchCatalog] = useState(false);
  const [promptToProceedToStepTwo, setShowStepTwoPrompt] = useState(false);

  const [hideStepOne, setHideStepOne] = useState(false);
  const [hideStepTwo, setHideStepTwo] = useState(true);

  const [foundBookId, setFoundBookId] = useState(null);

  const goToStepOne = () => {
    setHideStepOne(false);
    setHideStepTwo(true);
  };

  const goToStepTwo = () => {
    setShowSearchCatalog(false);
    setHideStepOne(true);
    setHideStepTwo(false);
  };
  const handleSearchBookCatalogButtonClick = (
    title: string,
    author: string
  ) => {
    setShowStepTwoPrompt(false);
    const data = props.bookData;
    if (!data) return;
    const booksArray = props.bookData;

    // Find a book that matches the entered title and author
    const bookFound = booksArray.find((book) => {
      return book.Title === title && book.Author === author;
    });
    if (bookFound) {
      setFoundBookId(bookFound.id);
      setShowSearchCatalog(true);
    } else {
      setFoundBookId(null);
      setShowSearchCatalog(false);
      setShowStepTwoPrompt(true);
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
          onChange={(e) => setTitleStateString(e.target.value)}
        />
        <TextField
          id="author"
          label="Author"
          defaultValue=""
          variant="standard"
          style={{ margin: '0.5rem 0' }}
          value={authorStateString}
          onChange={(e) => setAuthorStateString(e.target.value)}
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
        {showSearchCatalog && (
          <BookFoundModalForm
            foundBookId={foundBookId}
            showSecondStepFunction={goToStepTwo}
          />
        )}
        {promptToProceedToStepTwo && (
          <>
            <p>Book not found, please add it to the catalog:</p>
            <Button
              onClick={goToStepTwo}
              variant="contained"
              sx={{ margin: 0 }}
            >
              Add new book to catalog
            </Button>
          </>
        )}
      </Box>
      <Box
        id="addBookFormFlow-stepTwo"
        sx={hideStepTwo ? { display: 'none' } : { display: 'block' }}
      >
        <>
          <Button
            onClick={goToStepOne}
            sx={{ marginBottom: '0', color: 'black' }}
          >
            {'< Back'}
          </Button>
          <AddNewCopyOfBookForm
            title={titleStateString}
            author={authorStateString}
          />
        </>
      </Box>
    </>
  );
};

export default AddBookModalForm;
