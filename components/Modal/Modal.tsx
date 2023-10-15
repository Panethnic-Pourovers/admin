import React from 'react';

import {
  closeModalButtonStyles,
  modalContentContainerStyles,
  modalHeaderStyles,
} from '@/components/Modal/styles/modalStyles';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal as MUIModal } from '@mui/material';

type modalProps = {
  children: React.ReactNode;
  modalIsOpen: boolean;
  modalClose: () => void;
};

const Modal = (props: modalProps) => {
  return (
    <div style={{ width: '100%' }}>
      <MUIModal open={props.modalIsOpen}>
        <Box sx={modalContentContainerStyles}>
          <div style={modalHeaderStyles}>
            <Button onClick={props.modalClose} sx={closeModalButtonStyles}>
              <CloseIcon />
            </Button>
          </div>
          {props.children}
        </Box>
      </MUIModal>
    </div>
  );
};

export default Modal;
