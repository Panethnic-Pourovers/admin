import getEnvUrl from '@/src/utils/getEnvUrl';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { buttonStyle, scanButtonStyle, style } from './styles';

import axios from 'axios';

import React, { useCallback, useContext, useState } from 'react';

import { BooksContext } from '@/pages/books';

interface CheckoutPatchBody {
  bookId: string;
}

const CheckIn = () => {
  const [open, setOpen] = useState(false);
  const [barcode, setBarcode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const context = useContext(BooksContext);
  const [buttonText, setButtonText] = useState<string>('Check In');
  const updateButtonText = useCallback(
    (newText: string) => {
      setButtonText(newText);
    },
    [buttonText]
  );
  if (!context) throw new Error('Context is null');
  const { data, setData } = context;

  const handleCheckInOrOut = async () => {
    const url = getEnvUrl();
    const filteredData = data.filter(
      (item: any) => item['Barcode ID'] !== barcode
    );
    const toUpdate = data.filter(
      (item: any) => item['Barcode ID'] === barcode
    )[0];
    if (barcode === '') {
      setErrorMessage('Please fill in the barcode.');
      return;
    } else if (!toUpdate) {
      setErrorMessage('The book was not found in the catalogue.');
      return;
    } else if (!toUpdate['Checked Out']) {
      setErrorMessage('This book is not checked out.');
      return;
    }

    const patchBody: CheckoutPatchBody = {
      bookId: barcode
    };
    updateButtonText('Checking in...');
    const response = await axios.patch(`${url}/api/checkouts`, patchBody);
    if (response.status === 200) {
      setBarcode('');
      updateButtonText('Success');
      setTimeout(() => {
        updateButtonText('Check In');
      }, 1000);

      toUpdate['Checked Out'] = false;
      toUpdate['Checked Out By'] = 'N/A';
      toUpdate.Location = 'PEPO Checkin';
      setData([...filteredData, toUpdate]);
    } else {
      updateButtonText('Error');
      setTimeout(() => {
        updateButtonText('Check Out');
      }, 1000);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={buttonStyle}>
        Check In
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
              marginBottom: '0px'
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
                padding: 0
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
            Check In
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="standard-required"
              label="Barcode ID"
              placeholder="Value"
              variant="standard"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />
            <Button onClick={handleOpen} sx={scanButtonStyle}>
              Scan
            </Button>

            {errorMessage ? (
              <Typography color="error">{errorMessage}</Typography>
            ) : (
              <></>
            )}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '16px'
              }}
            >
              <Button onClick={handleCheckInOrOut} sx={buttonStyle}>
                {buttonText}
              </Button>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default CheckIn;
