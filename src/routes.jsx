import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/solid';
import { Home, Profile, Tables, Notifications } from '@/pages/dashboard';
import { SignIn, SignUp } from '@/pages/auth';
import { ViolationsPage } from './pages/violation/violations-page';
import { ShieldExclamationIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  AddLocationAlt,
  AdminPanelSettings,
  EditRoad,
  LocalOffer,
  LocalPolice,
  Lock,
  SupervisorAccount,
  TaxiAlert,
} from '@mui/icons-material';
import {
  ParkingSitesAdmin,
  ViolationsAdmin,
  ViolationsOfficer,
} from './pages/admin';
import ParkingSiteManager from './pages/admin/parking-site-managers';
import { ParkingLots, ParkingRates, ParkingSlots } from './pages/parking';
import { AccountManagement } from './pages/account';
import ViolationsTable from './components/Table/ViolationsTable';

const icon = {
  className: 'w-5 h-5 text-inherit',
};

export const routes = [
  {
    layout: 'dashboard',
    pages: [
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: 'dashboard',
      //   path: '/',
      //   element: <Home />,
      // },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: 'profile',
      //   path: '/profile',
      //   element: <Profile />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: 'tables',
      //   path: '/tables',
      //   element: <Tables />,
      // },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: 'notifications',
      //   path: '/notifications',
      //   element: <Notifications />,
      // },
    ],
  },
  {
    title: 'auth pages',
    layout: 'auth',
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: 'sign in',
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: 'sign up',
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
  // {
  //   layout: 'violation',
  //   pages: [
  //     {
  //       icon: <ShieldExclamationIcon {...icon} />,
  //       name: 'violations',
  //       path: '',
  //       element: <View />,
  //     },
  //     {
  //       icon: <ShieldExclamationIcon {...icon} />,
  //       name: 'views',
  //       path: '/views',
  //       // element: <Violation />,
  //     },
  //     // {
  //     //   name: 'violations',
  //     //   path: '/',
  //     //   element: <Violation />,
  //     // },
  //   ],
  // },
];

export const officerMenuItems = [
  {
    title: 'Violations',
    menuItems: [
      {
        title: 'Violations',
        icon: <TaxiAlert {...icon} />,
        url: 'violations-table',
        element: <ViolationsPage />,
      },
    ],
  },
  {
    title: 'Account',
    menuItems: [
      {
        title: 'Password',
        icon: <Lock {...icon} />,
        url: 'account-management',
        element: <ViolationsPage />,
      },
    ],
  },
];

export const superAdminMenuItems = [
  {
    title: 'Users',
    menuItems: [
      {
        title: 'Violations Admins',
        icon: <AdminPanelSettings {...icon} />,
        url: 'violations-admin',
        element: <ViolationsAdmin />,
      },
      {
        title: 'Parking Sites Admin',
        icon: <AdminPanelSettings {...icon} />,
        url: 'parking-sites-admin',
        element: <ParkingSitesAdmin />,
      },
      {
        title: 'Violation Officers',
        icon: <LocalPolice {...icon} />,
        url: 'violation-officers',
        element: <ViolationsOfficer />,
      },
      {
        title: 'Parking Site Managers',
        icon: <SupervisorAccount {...icon} />,
        url: 'parking-site-managers',
        element: <ParkingSiteManager />,
      },
    ],
  },
  {
    title: 'Violations',
    menuItems: [
      {
        title: 'Violations',
        icon: <TaxiAlert {...icon} />,
        url: 'violations-table',
        element: <ViolationsPage />,
      },
    ],
  },
  {
    title: 'Parking Site',
    menuItems: [
      {
        title: 'Parking Lots',
        icon: <AddLocationAlt {...icon} />,
        url: 'parking-sites',
        element: <ParkingLots />,
      },
      {
        title: 'Parking Slots',
        icon: <EditRoad {...icon} />,
        url: 'parking-slots',
        element: <ParkingSlots />,
      },
      {
        title: 'Parking Rates',
        icon: <LocalOffer {...icon} />,
        url: 'parking-rates',
        element: <ParkingRates />,
      },
    ],
  },
  {
    title: 'Account',
    menuItems: [
      {
        title: 'Password',
        icon: <Lock {...icon} />,
        url: 'account-management',
        element: <AccountManagement />,
      },
    ],
  },
];

export const violationAdminMenuItems = [
  {
    title: 'Users',
    menuItems: [
      // {
      //   title: 'Violations Admins',
      //   icon: <AdminPanelSettings {...icon} />,
      //   url: 'violations-admin',
      //   element: <ViolationsAdmin />,
      // },
      {
        title: 'Violation Officers',
        icon: <LocalPolice {...icon} />,
        url: 'violation-officers',
        element: <ViolationsOfficer />,
      },
    ],
  },
  {
    title: 'Violations',
    menuItems: [
      {
        title: 'Violations',
        icon: <TaxiAlert {...icon} />,
        url: 'violations-table',
        element: <ViolationsPage />,
      },
    ],
  },
  {
    title: 'Account',
    menuItems: [
      {
        title: 'Password',
        icon: <Lock {...icon} />,
        url: 'account-management',
        element: <AccountManagement />,
      },
    ],
  },
];

export default routes;
