import { Typography } from '@material-tailwind/react';
import React from 'react';

export default function StatusBadge({ status }) {
  const lowerCaseStatus = status.toLowerCase();
  return (
    <Typography
      className={`p-2 rounded-lg text-center font-bold xl:w-1/2 lg:w-full text-xs border ${lowerCaseStatus !== 'resolved' ? (lowerCaseStatus === 'pending' ? 'border-orange-400 text-orange-400' : 'border-red-600 text-red-600') : 'border-green-600 text-green-600'}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        padding: '0.5rem 1rem',
        width: '100%',
        height: '100%',
      }}
    >
      {status.toUpperCase() || ''}
    </Typography>
  );
}
