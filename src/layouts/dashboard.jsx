import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Button, IconButton, Typography } from '@material-tailwind/react';
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from '@/widgets/layout';
import routes from '@/routes';
import { useMaterialTailwindController, setOpenConfigurator } from '@/context';
import { useAuth } from '@/context/AuthContext';
import NavBar from '@/components/NavBar/NavBar';

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { state } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const RedirectLogin = (e) => {
    e.preventDefault();
    navigate('/auth/sign-in', { state: { from: location.pathname } });
  };

  return (
    <div>
      {!state.isLoggedIn && (
        <div className="p-12 flex justify-evenly items-center h-screen flex-wrap">
          <Typography className="w-full text-center mb-12">
            YOU ARE NOT ALLOWED TO ACCESS THIS
          </Typography>
          <Button className="bg-primary" onClick={RedirectLogin}>
            Login
          </Button>
        </div>
      )}
      {state.isLoggedIn && (
        //This div holds the navbar and the pages
        <div className=" bg-blue-gray-50/50 grid grid-cols-12 gap-4 p-8 relative min-h-0 overflow-y-hidden ">
          <div className="xl:col-span-3 sm:col-span-12 ">
            <NavBar routes={routes} />
          </div>

          <div className="xl:col-span-9 sm:col-span-12 relative ">
            <div>
              <DashboardNavbar />
              <Configurator />
            </div>
            <div>
              <Routes>
                {routes.map(
                  ({ layout, pages }) =>
                    layout === 'dashboard' &&
                    pages.map(({ path, element }) => (
                      <Route exact path={path} element={element} />
                    ))
                )}
              </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Dashboard.displayName = '/src/layout/dashboard.jsx';

export default Dashboard;