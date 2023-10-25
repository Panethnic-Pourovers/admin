import React from 'react';

export const modalContentContainerStyles: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '25px 40px',
  borderRadius: '4px',
  width: '80%',
  maxWidth: '400px'
};

export const modalHeaderStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '0px'
};

export const closeModalButtonStyles = {
  color: 'black',
  boxShadow: 'none',
  position: 'absolute',
  top: '0px',
  right: '-5px',
  padding: 0
};
