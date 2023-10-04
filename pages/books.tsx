/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
//next imports
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

// React imports
import React, { useMemo, useState } from 'react';

// MUI components
import { Box } from '@mui/material';

// custom components
import Layout from '@/components/Layout';
import Table from '@/components/Table';
import Search from '@/components/Search';
import AddBook from '@/components/bookCatalog/AddBook';
import CheckInOrOut from '@/components/bookCatalog/CheckInOrOut';

import { GridColDef } from '@mui/x-data-grid';

// dummy data import
import axios from 'axios';
import jsonData from 'dummyData.json';

// const getBooks = async (): Promise<any | undefined> => {
//   return new Promise((resolve, reject) => {});
// };

export const getServerSideProps: GetServerSideProps<{
  data: Record<string, any>;
}> = async () => {
  const url =
    process.env.NODE_ENV === 'production'
      ? 'http://localhost:3000'
      : 'http://localhost:3000';
  try {
    const response = await axios.get(`${url}/api/books`);
    // console.log(response);
    return { props: { data: response.data } };
  } catch {
    // console.log('error');
    return { props: { data: { error: 'Error loading books' } } };
  }
};

const Catalog = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  //state
  const [searchValue, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'UUID', width: 100, flex: 1 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'genres', headerName: 'Genre(s)', width: 200 },
    { field: 'regions', headerName: 'Region(s)', width: 200 },
    { field: 'location', headerName: 'Location', width: 200 },
    { field: 'availability', headerName: 'Availability', width: 200 },
  ];
  const { response } = jsonData.data;

  const loadData = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // Call loadData when searching
  React.useEffect(() => {
    loadData();
  }, [searchValue]);
  // TODO: as the data gets larger, do not pull the entire JSON response from database
  // TODO: Add an API endpoint between database call and frontend for more robust caching

  //search query filters based on all fields, with memoization
  const filteredItems = useMemo(() => {
    return response.filter((item) => {
      return new RegExp(
        searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'i'
      ).test(Object.values(item).toString());
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

        <Table rows={isLoading ? [] : filteredItems || []} columns={columns} />
        <Box
          className="bookCatalog-checkButtons"
          sx={{
            display: 'flex',
            flexFlow: 'row-reverse nowrap',
          }}
        >
          <CheckInOrOut title="Check Out" CheckInOrOut="Check Out" />
          <CheckInOrOut title="Check In" CheckInOrOut="Check In" />
        </Box>
      </div>
    </Layout>
  );
};

export default Catalog;
