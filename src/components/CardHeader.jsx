import { Card, Typography } from '@material-tailwind/react';
import React from 'react';

export default function CardHeader({ title }) {
  return (
    <Typography
      className="py-6"
      style={{ fontSize: '1.3rem', fontWeight: 'bold' }}
    >
      {title}
    </Typography>
  );
}
