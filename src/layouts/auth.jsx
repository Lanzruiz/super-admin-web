import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid';
import { Navbar, Footer } from '@/widgets/layout';
import routes from '@/routes';
import { useAuth } from '@/context/AuthContext';
import { Button, Typography } from '@material-tailwind/react';
import { Dashboard } from '.';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';

export function Auth() {
  const { state, dispatchAuth } = useAuth();

  const navbarRoutes = [
    {
      name: 'dashboard',
      path: '/dashboard/home',
      icon: ChartPieIcon,
    },
    {
      name: 'profile',
      path: '/dashboard/home',
      icon: UserIcon,
    },
    {
      name: 'sign up',
      path: '/auth/sign-up',
      icon: UserPlusIcon,
    },
    {
      name: 'sign in',
      path: '/auth/sign-in',
      icon: ArrowRightOnRectangleIcon,
    },
  ];

  return (
    <div className="relative min-h-screen w-full">
      {
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === 'auth' &&
              pages.map(({ path, element }) => (
                <Route key={nanoid()} exact path={path} element={element} />
              ))
          )}
          {/* {console.log('hello 1')} */}
        </Routes>
      }
    </div>
  );
}

Auth.displayName = '/src/layout/Auth.jsx';

export default Auth;
