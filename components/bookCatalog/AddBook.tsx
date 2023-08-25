// React imports
import React, { useState, useRef } from 'react';

// MUI components
import { Button, Box, Card, Modal } from '@mui/material';

// dummy data import
import jsonData from 'dummyData.json';

type newBookProps = {
  title: string;
  author: string;
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

    //after api call, reload page
    window.location.reload();
  };
  return (
    <form onSubmit={addNewBookSubmitHandler}>
      <label htmlFor="genre">Genre</label>
      <input type="text" name="genre" id="genre" />
      <label htmlFor="region">Region</label>
      <input type="text" name="region" id="region" />
      <label htmlFor="regionTwo">Region (optional)</label>
      <input type="text" name="regionTwo" id="regionTwo" />
    </form>
  );
};

const BookFound = (book) => {
  const [addNewBook, setAddNewBook] = useState(false);
  return (
    <Box>
      <p>Book found in catalog</p>
      <p>Book ID: {book.id}</p>
      <Button
        className="pepoButton-outline"
        variant="outlined"
        color={'secondary'}
        onClick={() => setAddNewBook(true)}
      >
        Add New Copy
      </Button>
      {addNewBook ? AddNewBookForm(book) : <></>}
    </Box>
  );
};

const DynamicComponent = (props: {
  bookExists: true | false | null;
  formObject: { title: string; author: string };
}) => {
  if (props.bookExists === null) return <></>;
  return props.bookExists
    ? BookFound(props.formObject)
    : AddNewBookForm(props.formObject);
};

const AddBook = () => {
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
      return { title, author };
    };
    const values = getValues();
    if (!values) return;
    if (!values.author || !values.title) return;
    //send api call to verify book
    const { response } = jsonData.data;
    const bookExists = Object.entries(response).filter(
      (book) =>
        book[1].title === values.title && book[1].author === values.author
    );

    return bookExists.length ? bookExists[0][1] : false;
  };

  const bookFormHanlder = (e) => {
    const status = verifyNewBook(e);
    if (!status) setBookExists(false);
    else {
      setBookExists(true);
      setFormObject(status);
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
          <Card>
            <h1>Modal</h1>
            <form ref={formRef} onSubmit={bookFormHanlder}>
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title" />
              <label htmlFor="author">Author</label>
              <input type="text" name="author" id="author" />
              <input type="submit" value="Search Book Catalog" />
            </form>
            <DynamicComponent bookExists={bookExists} formObject={formObject} />
          </Card>
        </Modal>
      </Box>
    </>
  );
};

export default AddBook;
