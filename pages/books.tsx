// React imports
import React, {useState} from "react";

// MUI components
import {Button} from '@mui/material'

// custom components
import Layout from "@/components/Layout";
import {BookCatalogTable} from "@/components/Table";

const addBookHandler = () => {}
const checkInBookHandler = () => {}
const checkOutBookHandler = () => {}

const Catalog = () => {
  return (
    <Layout>
      <div id="bookCatalog" className="page bookCatalog">
        <h1>Book Catalog</h1>
        <div className="bookCatalog-topbar">
          <div className="bookCatalog-topbar-search"></div>
          <div className="bookCatalog-topbar-buttons">
            <Button>Add Book</Button>
          </div>
        </div>
        <BookCatalogTable />
        <div className="bookCatalog-checkButtons">
          <Button>Check In</Button>
          <Button>Check Out</Button>
        </div>
      </div>
      <style jsx>{`
      `}</style>
    </Layout>
  );
};

export default Catalog;
