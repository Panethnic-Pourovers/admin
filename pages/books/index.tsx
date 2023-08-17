// React imports
import React, {useState, useRef} from "react";

// MUI components
import {Button} from '@mui/material'

// custom components
import Layout from "@/components/Layout";
import Table from "@/components/Table";

import { GridColDef } from '@mui/x-data-grid';

//styles
import global from '@/styles/global.module.css'
import styles from './books.module.css'

// dummy data import
import jsonData from 'dummyData.json';

const addBookHandler = (ref) => {
  console.log(ref);
}
const checkInBookHandler = (ref) => {
  console.log(ref);
}
const checkOutBookHandler = (ref) => {
  console.log(ref);
}


const Catalog = () => {
  //refs
  const [addBook, checkIn, checkOut] = Array.from(Array(3), () => useRef());

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

  return (
    <Layout>
      <div id={styles['bookCatalog']}>
        <h1>Book Catalog</h1>
        <div className={styles['bookCatalog-topbar']}>
          <div className={styles['bookCatalog-topbar-search']}></div>
          <div className={styles['bookCatalog-topbar-buttons']}>
            <Button 
              ref={addBook} 
              className={[global.pepoButton, global['pepoButton-outline']].join(' ')} 
              variant="outlined"
              onClick={() => addBookHandler(addBook)}
            >Add Book</Button>
          </div>
        </div>
        <Table rows={jsonData.data.response} columns={columns} />
        <div className={styles['bookCatalog-checkButtons']}>
          <Button 
            ref={checkIn} 
            className={global.pepoButton} 
            variant="contained"
            onClick={() => checkInBookHandler(checkIn)}
          >Check In</Button>
          <Button 
            ref={checkOut} 
            className={global.pepoButton} 
            variant="contained"
            onClick={() => checkOutBookHandler(checkOut)}
          >Check Out</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;