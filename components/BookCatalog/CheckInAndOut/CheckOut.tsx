import { BooksContext, formatDate } from '@/pages/books';
import getEnvUrl from '@/src/utils/getEnvUrl';
import theme from '@/styles/Theme';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useCallback, useContext, useState } from 'react';
import { buttonStyle, scanButtonStyle, style } from './styles';

interface CheckoutPostBody {
  memberId: string;
  bookId: string;
  dueDate: string;
}

const CheckOut = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(null);
  const [barcode, setBarcode] = useState<string>('');
  const [memberId, setMemberId] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('Check Out');
  const updateButtonText = useCallback(
    (newText: string) => {
      setButtonText(newText);
    },
    [buttonText]
  );

  const context = useContext(BooksContext);
  if (!context) throw new Error('Context is null');
  const { data, setData } = context;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCheckInOrOut = async () => {
    let response;
    const url = getEnvUrl();

    const toUpdate = data.filter(
      (item: any) => item['Barcode ID'] === barcode
    )[0];

    if (barcode === '' || memberId === '' || dueDate === null) {
      setErrorMessage('Please fill in all fields.');
      return;
    } else if (!toUpdate) {
      setErrorMessage('The book was not found in the catalogue.');
      return;
    } else if (toUpdate['Checked Out']) {
      setErrorMessage('This book is already checked out.');
      return;
    } else if (dueDate.isBefore(dayjs(new Date()))) {
      setErrorMessage('Due date must be after today.');
      return;
    }
    const postBody: CheckoutPostBody = {
      memberId: memberId,
      bookId: barcode,
      dueDate: dueDate.format('YYYY-MM-DD') + 'T21:59'
    };

    try {
      response = await axios.post(`${url}/api/checkouts`, postBody);
    } catch (e: any) {
      setErrorMessage(e.response.data.message);
      updateButtonText('Error');
      setTimeout(() => {
        updateButtonText('Check Out');
      }, 1000);
      return;
    }

    updateButtonText('Checking out...');
    if (response.status === 200) {
      setErrorMessage(null);
      setBarcode('');
      setMemberId('');
      setDueDate(null);
      updateButtonText('Success');
      setTimeout(() => {
        updateButtonText('Check Out');
      }, 1000);
      const filteredData = data.filter(
        (item: any) => item['Barcode ID'] !== barcode
      );

      toUpdate['Checked Out'] = true;
      toUpdate['Checked Out By'] =
        response.data[0].member.firstName +
        ' ' +
        response.data[0].member.lastName;
      toUpdate['Last Checked Out'] = formatDate(response.data[0].checkoutDate);
      toUpdate.Location = 'Checked Out';
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
        Check Out
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
            Check Out
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

            <TextField
              id="standard-required"
              label="Member ID"
              placeholder="Value"
              variant="standard"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
            <Button onClick={handleOpen} sx={scanButtonStyle}>
              Scan
            </Button>

            <DatePicker
              label="Due Date"
              slotProps={{
                textField: {
                  helperText: 'MM/DD/YYYY'
                }
              }}
              value={dueDate as any}
              onChange={(newValue: Date | null): void =>
                setDueDate(dayjs(newValue))
              }
            />

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

export default CheckOut;
