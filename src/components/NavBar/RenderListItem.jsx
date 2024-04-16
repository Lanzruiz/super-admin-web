import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function RenderListItem({ item }) {
  return (
    <NavLink to={item.url}>
      {({ isActive }) => (
        <Button
          variant={isActive ? 'filled' : 'text'}
          color="indigo"
          className={`flex items-center gap-4 capitalize w-full py-4 ${isActive ? 'text-white' : 'text-gray-800'}`}
          fullWidth
          to={item.url}
        >
          {item.icon}

          <Typography color="inherit" className="font-medium text-sm">
            {item.title}
          </Typography>
        </Button>
      )}
    </NavLink>
  );
}
