import React from 'react';

import { modalDiv } from '@/components/Modal/styles/modalStyles';

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
        <Box sx={modalDiv}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '0px',
            }}
          >
            <Button
              onClick={props.modalClose}
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
          {props.children}
        </Box>
      </MUIModal>
    </div>
  );
};

export default Modal;
