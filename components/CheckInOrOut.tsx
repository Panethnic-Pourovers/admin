import React from 'react';
import {
    Box,
    Button,
    Typography,
    Modal,
    TextField,
    ThemeProvider,
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import theme from './Theme';

const style = {
    position: 'absolute' as 'absolute',
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

    const scanButtonStyle = {
        fontSize: "0.9rem",
        mx: 0, // Changed from mx: 1 to mx: 0 to remove horizontal margin
        color: "black",
        display: "block",
        whiteSpace: "nowrap",
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        padding: '0rem 1rem',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    };

    const checkInAndOutButtonStyle = {
        my: 2,
        fontSize: "1rem",
        mx: 1,
        color: "black",
        display: "block",
        whiteSpace: "nowrap",
        backgroundColor: theme.palette.primary.main,
        border: `0.1rem solid ${theme.palette.primary.main}`,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Button
                    onClick={handleOpen}
                    sx={checkInAndOutButtonStyle}
                >
                    {CheckInOrOut}
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0px' }}>
                            {/* Move the CloseIcon button here */}
                            <Button onClick={handleClose} sx={{ color: 'black', boxShadow: 'none', position: 'absolute', top: '0px', right: '-5px', padding: 0 }}>
                                <CloseIcon />
                            </Button>
                        </div>
                        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                            {title}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <TextField
                                id="standard-required"
                                label="UUID"
                                placeholder="Value"
                                variant="standard"
                            />
                            <Button
                                onClick={handleOpen}
                                sx={scanButtonStyle}
                            >
                                Scan
                            </Button>
                            <TextField
                                id="standard-required"
                                label="Member ID"
                                placeholder="Value"
                                variant="standard"
                            />
                            <Button
                                onClick={handleOpen}
                                sx={scanButtonStyle}
                            >
                                Scan
                            </Button>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginTop: "16px",
                                }}
                            >
                                <Button
                                    onClick={handleOpen}
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
