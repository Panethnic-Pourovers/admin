/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// React imports
import React, { useState, useEffect, useRef } from 'react';

// MUI components
import { Button, Box, Card, Modal, Select, TextField } from '@mui/material';

import styles from './AddBook.module.scss';

// axios imports
import axios from 'axios';
import { Book } from '@prisma/client';

type BookSearchFormValuesType = {
  title: string;
  author: string;
};

type flowProps = {
  bookExistsInLibraryDb: boolean;
  formObject: BookSearchFormValuesType;
};

const sendBookToAPI = (book) => {
  //send api call to add new book
  axios.post('/api/books', book);
  //after api call, reload page
  window.location.reload();
};

const AddNewBookFormComponent = (props: BookSearchFormValuesType) => {
  const submitBookToAPIHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const genreAndRegionFormElementArray: Element[] = Array.from(
      e.nativeEvent.target as HTMLFormElement
    );

    const formInputsDontExist =
      !(genreAndRegionFormElementArray[0] instanceof HTMLSelectElement) ||
      !(genreAndRegionFormElementArray[1] instanceof HTMLSelectElement);

    if (formInputsDontExist) return alert('Please enter a genre and region');

    const genreElement = genreAndRegionFormElementArray[0] as HTMLSelectElement;
    const regionElement =
      genreAndRegionFormElementArray[1] as HTMLSelectElement;

    const { title, author } = props;
    const genreValue = genreElement.value;
    const regionValue = regionElement.value;
    const regionTwoValue =
      genreAndRegionFormElementArray[2] instanceof HTMLSelectElement
        ? genreAndRegionFormElementArray[2].value
        : null;

    const bookToSend = {
      title,
      author,
      genre: genreValue,
      region: regionValue,
      regionTwo: regionTwoValue,
    };

    sendBookToAPI(bookToSend);
  };

  return (
    <form
      className={[styles.form, styles.addNewForm].join(' ')}
      onSubmit={submitBookToAPIHandler}
    >
      <label htmlFor="genre">Genre</label>
      <Select variant="standard" name="genre" id="genre" />
      <label htmlFor="region">Region</label>
      <Select variant="standard" name="region" id="region" />
      <label htmlFor="regionTwo">Region (optional)</label>
      <Select variant="standard" name="regionTwo" id="regionTwo" />
      <Button
        variant="outlined"
        color={'secondary'}
        sx={{ width: 'max-content' }}
        type="submit"
      >
        Add New Book
      </Button>
    </form>
  );
};

const BookFoundInDbAlertComponent = (book) => {
  const [addNewBook, setAddNewBook] = useState(false);
  return (
    <>
      <Box className={styles.bookFound}>
        <p>Book found in catalog</p>
        <p>Book ID: {book.id}</p>
        <Button
          className="pepoButton-outline"
          variant="outlined"
          color={'secondary'}
          sx={{ marginLeft: '0', cursor: 'pointer' }}
          onClick={() => setAddNewBook(true)}
        >
          Add New Copy
        </Button>
      </Box>
      {addNewBook ? AddNewBookFormComponent(book) : <></>}
    </>
  );
};

const AddBookModalFormFlow = (props: flowProps) => {
  if (props.bookExistsInLibraryDb === null) return <></>;
  return props.bookExistsInLibraryDb
    ? BookFoundInDbAlertComponent(props.formObject)
    : AddNewBookFormComponent(props.formObject);
};

const AddBook = (books) => {
  const addBookModalRef = useRef();
  const formRef = useRef<HTMLFormElement>();

  //state
  const [addBookModalOpenStatus, setAddBookModalOpenStatus] = useState(false);
  const [bookExistsInLibraryDb, setBookExistsInLibraryDb] = useState(null);
  const [bookSearchFormValues, setBookSearchFormValues] = useState({
    title: '',
    author: '',
  });

  const addBookModalOpenHandler = () => setAddBookModalOpenStatus(true);
  const addBookModalCloseHandler = () => {
    setAddBookModalOpenStatus(false);
    setBookExistsInLibraryDb(null);
    if (formRef.current) formRef.current.reset();
    setBookSearchFormValues({ title: '', author: '' });
  };

  const checkIfBookExistsInLibraryDb = (e: React.SyntheticEvent): boolean => {
    e.preventDefault();

    const getBookSearchFormValues = ():
      | false
      | { title: string; author: string } => {
      const bookSearchFormElementArray: Element[] = Array.from(
        e.nativeEvent.target as HTMLFormElement
      );

      const bookSearchFormInputsDontExist =
        !(bookSearchFormElementArray[0] instanceof HTMLInputElement) ||
        !(bookSearchFormElementArray[1] instanceof HTMLInputElement);

      if (bookSearchFormInputsDontExist) {
        alert(
          'Apologies, there has been an error. Please try again in a few minutes.'
        );
        return false;
      }

      const titleElement = bookSearchFormElementArray[0] as HTMLInputElement;
      const authorElement = bookSearchFormElementArray[1] as HTMLInputElement;

      const titleValue = titleElement.value;
      const authorValue = authorElement.value;

      setBookSearchFormValues({ title: titleValue, author: authorValue });

      return { title: titleValue, author: authorValue };
    };
    const bookSearchFormValues = getBookSearchFormValues();

    function isBookSearchFormValuesType(
      bookSearchFormValues: false | BookSearchFormValuesType
    ): bookSearchFormValues is BookSearchFormValuesType {
      const { title, author } =
        bookSearchFormValues as BookSearchFormValuesType;

      const titleIsUndefined = title === undefined;
      const authorIsUndefined = author === undefined;
      const bookSearchValuesUndefined = titleIsUndefined || authorIsUndefined;

      const titleIsEmpty = title === '';
      const authorIsEmpty = author === '';
      const bookSearchValuesEmpty = titleIsEmpty || authorIsEmpty;

      if (bookSearchValuesUndefined || bookSearchValuesEmpty) {
        return false;
      }

      return true;
    }

    if (!isBookSearchFormValuesType(bookSearchFormValues)) {
      alert('Please enter a title and author');
      return false;
    }

    const { title, author } = bookSearchFormValues;

    //send api call to verify book
    const getAllInstancesOfBookInDb = Object.values(books.books).filter(
      (book: Book) => {
        const matchBookViaTitleandAuthor =
          book.title === title && book.author === author;
        return matchBookViaTitleandAuthor;
      }
    );
    return getAllInstancesOfBookInDb.length > 0 ? true : false;
  };

  const bookFormHanlder = (e) => {
    const status = checkIfBookExistsInLibraryDb(e);
    status ? setBookExistsInLibraryDb(true) : setBookExistsInLibraryDb(false);
  };

  return (
    <>
      <Button
        className="pepoButton-outline"
        variant="outlined"
        color={'secondary'}
        onClick={() => addBookModalOpenHandler()}
      >
        Add Book
      </Button>
      <Box>
        <Modal
          ref={addBookModalRef}
          open={addBookModalOpenStatus}
          onClose={() => addBookModalCloseHandler()}
        >
          <Card className={styles.modalCard}>
            <Box className={styles['modalCard-close']}>
              <a onClick={() => addBookModalCloseHandler()}>&times;</a>
            </Box>
            <h1>Add Book</h1>
            <form
              className={styles['modalCard-form']}
              ref={formRef}
              onSubmit={bookFormHanlder}
            >
              <label htmlFor="title">Title</label>
              <TextField
                variant="standard"
                type="text"
                name="title"
                id="title"
              />
              <label htmlFor="author">Author</label>
              <TextField
                variant="standard"
                type="text"
                name="author"
                id="author"
              />
              <input type="submit" value="Search Book Catalog" />
            </form>
            <AddBookModalFormFlow
              bookExistsInLibraryDb={bookExistsInLibraryDb}
              formObject={bookSearchFormValues}
            />
          </Card>
        </Modal>
      </Box>
    </>
  );
};

export default AddBook;
