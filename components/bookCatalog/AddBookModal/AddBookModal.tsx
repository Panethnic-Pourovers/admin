import { Button } from '@mui/material';
import { useState } from 'react';

import Modal from '@/components/Modal';

import AddBookModalForm from './AddBookModalForm';

import { addBookStyle } from './styles/addBookStyles';

export default function AddBookModal({ bookData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" sx={addBookStyle}>
        Add Book
      </Button>
      <Modal
        modalIsOpen={open}
        modalClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddBookModalForm bookData={bookData} />
      </Modal>
    </div>
  );
}
