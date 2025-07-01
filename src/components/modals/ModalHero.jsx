import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModalHero = ({ open, onClose }) => {
    const [adultCount, setAdultCount] = useState(0);
    const [childrenCount, setChildrenCount] = useState(0);

    const handleAdultIncrement = () => {
        setAdultCount(prev => Math.min(prev + 1, 5));
    };

    const handleAdultDecrement = () => {
        setAdultCount(prev => Math.max(prev - 1, 0));
    };

    const handleChildrenIncrement = () => {
        setChildrenCount(prev => Math.min(prev + 1, 7));
    };

    const handleChildrenDecrement = () => {
        setChildrenCount(prev => Math.max(prev - 1, 0));
    };

    const handleSubmit = () => {
        onClose({ adults: adultCount, children: childrenCount });
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '420px' },
        bgcolor: 'background.paper',
        borderRadius: '16px',
        boxShadow: 24,
        p: 4,
        outline: 'none'
    };

    const counterButtonStyle = {
        minWidth: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid #ddd',
        fontSize: '1.2rem'
    };

    return (
        <Modal open={open} onClose={() => onClose(null)}>
            <Box sx={style} className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <Typography variant="h6" className="font-bold text-xl text-gray-800">
                        Select Guests
                    </Typography>
                    <IconButton onClick={() => onClose(null)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                
                <div className="flex flex-col gap-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-lg font-medium text-gray-700">Adults</p>
                            <p className="text-sm text-gray-500">Ages 13 or above</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <IconButton
                                onClick={handleAdultDecrement}
                                sx={counterButtonStyle}
                                disabled={adultCount === 0}
                            >
                                -
                            </IconButton>
                            <Typography variant="body1" sx={{ minWidth: '20px', textAlign: 'center' }}>
                                {adultCount}
                            </Typography>
                            <IconButton
                                onClick={handleAdultIncrement}
                                sx={counterButtonStyle}
                                disabled={adultCount === 5}
                            >
                                +
                            </IconButton>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-lg font-medium text-gray-700">Children</p>
                            <p className="text-sm text-gray-500">Ages 2-12</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <IconButton
                                onClick={handleChildrenDecrement}
                                sx={counterButtonStyle}
                                disabled={childrenCount === 0}
                            >
                                -
                            </IconButton>
                            <Typography variant="body1" sx={{ minWidth: '20px', textAlign: 'center' }}>
                                {childrenCount}
                            </Typography>
                            <IconButton
                                onClick={handleChildrenIncrement}
                                sx={counterButtonStyle}
                                disabled={childrenCount === 7}
                            >
                                +
                            </IconButton>
                        </div>
                    </div>
                </div>

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{
                        py: 1.5,
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        mt: 2
                    }}
                >
                    Confirm
                </Button>
            </Box>
        </Modal>
    );
};

export default ModalHero;