import { Typography } from '@mui/material';
import React from 'react';

export default function FormLabel({ children, ...restProps }) {
  return (
    <Typography
      display="block"
      color="gray"
      component="label"
      variant="body2"
      noWrap
      {...restProps}
    >
      {children}
    </Typography>
  );
}
