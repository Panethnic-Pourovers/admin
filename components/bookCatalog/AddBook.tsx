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

type newBookProps = {
  title: string;
  author: string;
};

type flowProps = {
  bookExists: true | false | null;
  formObject: { title: string; author: string };
};
const AddNewBookForm = (props: newBookProps) => {
  const addNewBookSubmitHandler = (e) => {
    e.preventDefault();
    const form = Array.from(e.nativeEvent.srcElement);
    if (
      !(form[0] instanceof HTMLInputElement) ||
      !(form[1] instanceof HTMLInputElement)
    )
      return alert('Please enter a genre and region');
    const { title, author } = props;
    const genre = form[0].value;
    const region = form[1].value;
    const regionTwo =
      form[2] instanceof HTMLInputElement ? form[2].value : null;
    const bookObject = compileBookObject(
      title,
      author,
      genre,
      region,
      regionTwo
    );
    sendNewBook(bookObject);
  };
  const compileBookObject = (
    title: string,
    author: string,
    genre: string,
    region: string,
    regionTwo: string | null
  ) => {
    const bookObject = {
      title,
      author,
      genre,
      region,
      regionTwo,
    };
    return bookObject;
  };
  const sendNewBook = (book) => {
    //send api call to add new book
    axios.post('/api/books', book);
    //after api call, reload page
    window.location.reload();
  };
  return (
    <form
      className={[styles.form, styles.addNewForm].join(' ')}
      onSubmit={addNewBookSubmitHandler}
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
      >
        Add New Book
      </Button>
    </form>
  );
};

const BookFound = (book) => {
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
      {addNewBook ? AddNewBookForm(book) : <></>}
    </>
  );
};

const AddBookModalFormFlow = (props: flowProps) => {
  if (props.bookExists === null) return <></>;
  return props.bookExists
    ? BookFound(props.formObject)
    : AddNewBookForm(props.formObject);
};

const AddBook = (books) => {
  const addBookModal = useRef();
  const formRef = useRef<HTMLFormElement>();

  //state
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [bookExists, setBookExists] = useState(null);
  const [formObject, setFormObject] = useState({ title: '', author: '' });

  const addBookOpenHandler = () => setAddBookOpen(true);
  const addBookCloseHandler = () => {
    setAddBookOpen(false);
    setBookExists(null);
    if (formRef.current) formRef.current.reset();
    setFormObject({ title: '', author: '' });
  };

  const verifyNewBook = (e) => {
    e.preventDefault();
    const getValues = () => {
      const form = Array.from(e.nativeEvent.srcElement);
      if (
        !(form[0] instanceof HTMLInputElement) ||
        !(form[1] instanceof HTMLInputElement)
      ) {
        return alert('Please enter a title and author');
      }

      const title = form[0].value;
      const author = form[1].value;
      setFormObject({ title, author });
      return { title, author };
    };
    const values = getValues();
    if (!values) return;
    if (!values.author || !values.title) return;
    //send api call to verify book
    const bookExists = Object.values(books.books).filter((book: Book) => {
      console.log(book);
      book.title === values.title && book.author === values.author;
    });

    return bookExists.length ? bookExists[0][1] : false;
  };

  const bookFormHanlder = (e) => {
    const status = verifyNewBook(e);
    if (!status) setBookExists(false);
    else {
      setBookExists(true);
      // setFormObject(status);
    }
  };

  return (
    <>
      <Button
        className="pepoButton-outline"
        variant="outlined"
        color={'secondary'}
        onClick={() => addBookOpenHandler()}
      >
        Add Book
      </Button>
      <Box>
        <Modal
          ref={addBookModal}
          open={addBookOpen}
          onClose={() => addBookCloseHandler()}
        >
          <Card className={styles.modalCard}>
            <Box className={styles['modalCard-close']}>
              <a onClick={() => addBookCloseHandler()}>&times;</a>
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
              bookExists={bookExists}
              formObject={formObject}
            />
          </Card>
        </Modal>
      </Box>
    </>
  );
};

export default AddBook;
