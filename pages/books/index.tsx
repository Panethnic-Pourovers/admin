// React imports
import React, {useState, useRef} from "react";

// MUI components
import {Button} from '@mui/material'

// custom components
import Layout from "@/components/Layout";
import {BookCatalogTable} from "@/components/Table";

const addBookHandler = (ref) => {
  console.log(ref);
}
const checkInBookHandler = (ref) => {
  console.log(ref);
}
const checkOutBookHandler = (ref) => {
  console.log(ref);
}

import global from '@/styles/global.module.css'
import styles from './books.module.css'

const Catalog = () => {
  const [addBook, checkIn, checkOut] = Array.from(Array(3), () => useRef());
  
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
        <BookCatalogTable />
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
