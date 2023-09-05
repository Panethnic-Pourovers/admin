// React imports
import React, { useState, useRef, useMemo } from 'react';

// MUI components
import { Button, Box, Card, Modal } from '@mui/material';

// custom components
import Layout from '@/components/Layout';
import Table from '@/components/Table';
import Search from '@/components/Search';
import AddBook from '@/components/bookCatalog/AddBook';
import CheckInOrOut from '@/components/bookCatalog/CheckInOrOut';

import { GridColDef } from '@mui/x-data-grid';

// dummy data import
import jsonData from 'dummyData.json';

const Catalog = () => {
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

  //search query filters based on all fields, with memoization
  const filteredItems = useMemo(() => {
    const keys: string[] = Object.keys(response[0]);
    return response.filter((item) => {
      return keys.some((key) => {
        return (
          item[key] &&
          item[key].toString().toLowerCase().includes(searchValue.toLowerCase())
        );
      });
    });
  }, [response, searchValue]);

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
          <div className="bookCatalog-topbar-search">
            <Search search={searchValue} setSearch={setSearch} />
          </div>
          <div className="bookCatalog-topbar-buttons">
            <AddBook />
          </div>
        </Box>
        <Table rows={filteredItems || []} columns={columns} />
        <Box
          className="bookCatalog-checkButtons"
          sx={{
            display: 'flex',
            flexFlow: 'row-reverse nowrap',
          }}
        >
          <CheckInOrOut title="Check In" CheckInOrOut="Check In" />
          <CheckInOrOut title="Check Out" CheckInOrOut="Check Out" />
        </Box>
      </div>
    </Layout>
  );
};

export default Catalog;
