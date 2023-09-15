/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// React imports
import React, { useState } from 'react';

// MUI components
import { Box, Button } from '@mui/material';

// custom components
import Layout from '@/components/Layout';
import Table from '@/components/Table';
import Search from '@/components/Search';

import { GridColDef } from '@mui/x-data-grid';

// dummy data import
import jsonData from 'dummyDataMembers.json';

const Members = () => {
  //state
  const [searchValue, setSearch] = useState('');

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'UUID', width: 150, flex: 1 },
    { field: 'firstName', headerName: 'First Name', width: 300 },
    { field: 'lastName', headerName: 'Last Name', width: 300 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'phone', headerName: 'Phone Number', width: 200 },
    { field: 'checkouts', headerName: 'Checkouts', width: 200 },
  ];

  return (
    <Layout>
      <div>
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
        </Box>
        <Table rows={jsonData || []} columns={columns} />
        <div style={{ textAlign: 'right' }}>
          <Button variant="contained">Add Member</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Members;
