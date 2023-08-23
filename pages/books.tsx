// React imports
import React, { useState, useRef } from 'react';

// MUI components
import { Button } from '@mui/material';

// custom components
import Layout from '@/components/Layout';
import Table from '@/components/Table';

import { GridColDef } from '@mui/x-data-grid';

// dummy data import
import jsonData from 'dummyData.json';
import Box from '@mui/material/Box';

const addBookHandler = (ref) => {
  console.log(ref);
};
const checkInBookHandler = (ref) => {
  console.log(ref);
};
const checkOutBookHandler = (ref) => {
  console.log(ref);
};

const Catalog = () => {
  //refs
  // apparently eslint doesn't like this :(
  // const [addBook, checkIn, checkOut] = Array.from(Array(3), () => useRef());
  const addBook = useRef();
  const checkIn = useRef();
  const checkOut = useRef();

  //state
  const [searchValue, setSearch] = useState('');

  //dummy data
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'UUID', width: 200 },
    { field: 'title', headerName: 'Book Title', width: 200, flex: 1 },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'genres', headerName: 'Genre(s)', width: 200 },
    { field: 'regions', headerName: 'Region(s)', width: 200 },
    { field: 'location', headerName: 'Location', width: 200 },
    { field: 'member', headerName: 'Member', width: 200 },
    { field: 'lastCheckedOut', headerName: 'Last Checked Out', width: 200 },
  ];

  const { response } = jsonData.data;

  return (
    <Layout>
      <div id="bookCatalog">
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
          }}
          className="bookCatalog-topbar"
        >
          <div className="bookCatalog-topbar-search"></div>
          <div className="bookCatalog-topbar-buttons">
            <Button
              ref={addBook}
              className="pepoButton-outline"
              variant="outlined"
              color={'secondary'}
              onClick={() => addBookHandler(addBook)}
            >
              Add Book
            </Button>
          </div>
        </Box>
        <Table rows={response || []} columns={columns} />
        <Box
          className="bookCatalog-checkButtons"
          sx={{
            display: 'flex',
            flexFlow: 'row-reverse nowrap',
          }}
        >
          <Button
            ref={checkIn}
            variant="contained"
            onClick={() => checkInBookHandler(checkIn)}
          >
            Check In
          </Button>
          <Button
            ref={checkOut}
            variant="contained"
            onClick={() => checkOutBookHandler(checkOut)}
          >
            Check Out
          </Button>
        </Box>
      </div>
    </Layout>
  );
};

export default Catalog;
