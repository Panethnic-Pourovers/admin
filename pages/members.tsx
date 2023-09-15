/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// React imports
import React, { useState } from 'react';

// MUI components
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
  ThemeProvider,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// custom components
import Layout from '@/components/Layout';
import Table from '@/components/Table';
import Search from '@/components/Search';

import { GridColDef } from '@mui/x-data-grid';

// dummy data import
import jsonData from 'dummyDataMembers.json';
import theme from '@/styles/Theme';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '32px 32px 12px 32px',
};

const Members = () => {
  //state
  const [searchValue, setSearch] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <ThemeProvider theme={theme}>
          <div>
            <div style={{ textAlign: 'right' }}>
              <Button variant="contained" onClick={handleOpen}>
                Add Members
              </Button>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '0px',
                  }}
                >
                  <Button
                    onClick={handleClose}
                    sx={{
                      color: 'black',
                      boxShadow: 'none',
                      position: 'absolute',
                      top: '0px',
                      right: '-5px',
                      padding: 0,
                    }}
                  >
                    <CloseIcon />
                  </Button>
                </div>
                <Typography
                  id="modal-modal-title"
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 'bold', margin: '1rem 0rem' }}
                >
                  Add a Member
                </Typography>
                <FormControl
                  variant="standard"
                  style={{ marginBottom: '1rem' }}
                >
                  <InputLabel htmlFor="component-simple">First Name</InputLabel>
                  <Input id="component-simple" placeholder="Value" />
                </FormControl>
                <FormControl
                  variant="standard"
                  style={{ marginBottom: '1rem' }}
                >
                  <InputLabel htmlFor="component-simple">Last Name</InputLabel>
                  <Input id="component-simple" placeholder="Value" />
                </FormControl>
                <FormControl
                  variant="standard"
                  style={{ marginBottom: '1rem' }}
                >
                  <InputLabel htmlFor="component-simple">Email</InputLabel>
                  <Input id="component-simple" placeholder="Value" />
                </FormControl>
                <FormControl
                  variant="standard"
                  style={{ marginBottom: '1rem' }}
                >
                  <InputLabel htmlFor="component-simple">
                    Phone Number
                  </InputLabel>
                  <Input id="component-simple" placeholder="Value" />
                </FormControl>

                <div style={{ textAlign: 'right' }}>
                  <Button variant="contained" onClick={handleOpen}>
                    Add
                  </Button>
                </div>
              </Box>
            </Modal>
          </div>
        </ThemeProvider>
      </div>
    </Layout>
  );
};

export default Members;
