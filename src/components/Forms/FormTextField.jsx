import { TextField } from '@mui/material';
import React from 'react';

export default function FormTextField({ name, ...restProps }) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      name={name}
      {...restProps}
    />
  );
}
