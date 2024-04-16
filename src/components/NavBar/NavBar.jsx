import { useMaterialTailwindController } from '@/context';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import NavHeader from './NavHeader';
import MainMenuItems from './MainMenuItems';
import {
  officerMenuItems,
  superAdminMenuItems,
  violationAdminMenuItems,
} from '@/routes';
import Divider from '../Divider';
import { Paper } from '@mui/material';

export default function NavBar({ routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const icon = {
    className: 'w-5 h-5 text-inherit',
  };
  const { state, dispatchAuth } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    // Simulated logout logic
    dispatchAuth({ type: 'LOGOUT', payload: { user: null } });
    navigate('/auth/sign-in', { state: { from: location.pathname } });
  };

  return (
    <Paper
      sx={{
        p: 2,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <div className="flex flex-col h-full relative">
        <NavHeader />

        <div className="pt-4">
          <Divider />
        </div>

        <div className="flex flex-col flex-grow">
          <ul className="flex flex-col gap-1">
            <MainMenuItems menuItems={violationAdminMenuItems} />
          </ul>
        </div>

        <Button
          variant={'filled'}
          color={'red'}
          className="flex items-center gap-4 px-4 capitalize my-4"
          fullWidth
          onClick={handleLogout}
        >
          <ArrowLeftOnRectangleIcon {...icon} />

          <Typography
            color="inherit"
            className="font-medium capitalize text-base md:text-lg lg:text-lg xl:text-lg"
          >
            Logout
          </Typography>
        </Button>
      </div>
    </Paper>
  );
}
