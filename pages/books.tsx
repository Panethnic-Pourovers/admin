//next imports
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

// React imports
import React, { useState } from 'react';

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
    console.log(response);
    return { props: { data: response.data } };
  } catch {
    console.log('error');
    return { props: { data: { error: 'Error loading books' } } };
  }
};

const Catalog = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  //state
  const [searchValue, setSearch] = useState('');

  // const columns: GridColDef[] = [
  //   { field: 'id', headerName: 'UUID', width: 200 },
  //   { field: 'title', headerName: 'Book Title', width: 200, flex: 1 },
  //   { field: 'author', headerName: 'Author', width: 200 },
  //   { field: 'genres', headerName: 'Genre(s)', width: 200 },
  //   { field: 'regions', headerName: 'Region(s)', width: 200 },
  //   { field: 'location', headerName: 'Location', width: 200 },
  //   { field: 'member', headerName: 'Member', width: 200 },
  //   { field: 'lastCheckedOut', headerName: 'Last Checked Out', width: 200 },
  // ];

  const columns: GridColDef[] = data.schema.map((column) => {
    return { field: column, headerName: column, flex: 1 };
  });

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
        <Table rows={data.books || []} columns={columns} />
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
