import theme from '@/styles/Theme';

export const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '32px 32px 12px 32px'
};
export const scanButtonStyle = {
  fontSize: '0.9rem',
  mx: 0,
  color: 'black',
  display: 'block',
  whiteSpace: 'nowrap',
  backgroundColor: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  padding: '0rem 1rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.main
  }
};
export const buttonStyle = {
  my: 2,
  fontSize: '1rem',
  mx: 1,
  color: 'black',
  display: 'block',
  whiteSpace: 'nowrap',
  backgroundColor: theme.palette.primary.main,
  border: `0.1rem solid ${theme.palette.primary.main}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.main
  }
};
