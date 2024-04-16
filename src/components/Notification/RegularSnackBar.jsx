import { Alert, Snackbar, Typography } from '@mui/material';
import React from 'react';

export default function RegularSnackBar({
  open,
  handleClose,
  message,
  severity,
  duration,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration || 1500}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%', p: 3, borderRadius: 2 }}
      >
        <Typography variant="body2">{message}</Typography>
      </Alert>
    </Snackbar>
  );
}
