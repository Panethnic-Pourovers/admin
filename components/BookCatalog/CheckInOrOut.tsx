import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  ThemeProvider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import theme from '@/styles/Theme';
import axios from 'axios';

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

export default function CheckInOrOut({ title, CheckInOrOut }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCheckInOrOut = async () => {
    let response;
    const url =
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:3000'
        : 'http://localhost:3000';
    if (CheckInOrOut === 'Check In') {
      // response = await axios.get(`${url}/api/books`);
    } else {
      // response = await axios.get(`${url}/api/books`);
    }
    console.log(response);
  };

  const scanButtonStyle = {
    fontSize: '0.9rem',
    mx: 0,
    color: 'black',
    display: 'block',
    whiteSpace: 'nowrap',
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: '0rem 1rem',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  };

  const checkInAndOutButtonStyle = {
    my: 2,
    fontSize: '1rem',
    mx: 1,
    color: 'black',
    display: 'block',
    whiteSpace: 'nowrap',
    backgroundColor: theme.palette.primary.main,
    border: `0.1rem solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button onClick={handleOpen} sx={checkInAndOutButtonStyle}>
          {CheckInOrOut}
        </Button>
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
              sx={{ fontWeight: 'bold' }}
            >
              {title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                id="standard-required"
                label="UUID"
                placeholder="Value"
                variant="standard"
              />
              <Button onClick={handleOpen} sx={scanButtonStyle}>
                Scan
              </Button>
              <TextField
                id="standard-required"
                label="Member ID"
                placeholder="Value"
                variant="standard"
              />
              <Button onClick={handleOpen} sx={scanButtonStyle}>
                Scan
              </Button>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '16px',
                }}
              >
                <Button
                  onClick={handleCheckInOrOut}
                  sx={checkInAndOutButtonStyle}
                >
                  {title}
                </Button>
              </Box>
            </Typography>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
