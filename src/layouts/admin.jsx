import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes, { officerMenuItems, superAdminMenuItems } from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/NavBar/NavBar";
import { MessageReceiver } from "@/graphql/apollo-subcription";

export function Admin() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { state } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // console.log("STATE DATA: ", state);

  const RedirectLogin = (e) => {
    e.preventDefault();
    navigate("/auth/sign-in", { state: { from: location.pathname } });
  };

  return (
    <>
      {!state.isLoggedIn && (
        <div className="flex h-screen flex-wrap items-center justify-evenly p-12">
          <Typography className="mb-12 w-full text-center">
            YOU ARE NOT ALLOWED TO ACCESS THIS
          </Typography>
          <Button className="bg-primary" onClick={RedirectLogin}>
            Login
          </Button>
        </div>
      )}
      {state.isLoggedIn && (
        //This div holds the navbar and the pages
        <div className="h-dvh w-dvw relative flex select-none font-inter">
          <nav className="h-full w-[400px]">
            <NavBar routes={routes} />
          </nav>

          <div className="h-full w-full bg-white py-6">
            <MessageReceiver />
            <Routes>
              {superAdminMenuItems.map(({ menuItems }) =>
                menuItems.map((item) => {
                  return (
                    <Route
                      key={item.url}
                      exact
                      path={item.url}
                      element={item.element}
                    />
                  );
                }),
              )}
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

Admin.displayName = "/src/layout/admin.jsx";

export default Admin;
