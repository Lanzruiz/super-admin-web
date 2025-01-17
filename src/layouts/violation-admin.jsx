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
import routes, {
  officerMenuItems,
  superAdminMenuItems,
  violationAdminMenuItems,
} from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/NavBar/NavBar";
import { MessageReceiver } from "@/graphql/apollo-subcription";
import { Paper } from "@mui/material";

export function ViolationAdmin() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { state } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const RedirectLogin = (e) => {
    e.preventDefault();
    navigate("/auth/sign-in", { state: { from: location.pathname } });
  };

  return (
    <Paper
      sx={{
        height: "100vh",
      }}
    >
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
        <div className=" relative grid h-full min-h-0  grid-cols-12 gap-4 overflow-y-hidden  bg-blue-gray-50/50">
          <div className="sm:col-span-12 xl:col-span-3 ">
            <NavBar routes={routes} />
          </div>

          <div className="relative sm:col-span-12 xl:col-span-9 ">
            <div>
              <MessageReceiver />
              {/* <DashboardNavbar /> */}
              <Configurator />
            </div>
            <div>
              <Routes>
                {violationAdminMenuItems.map(({ menuItems }) =>
                  menuItems.map((item) => (
                    <Route
                      key={item.url}
                      exact
                      path={item.url}
                      element={item.element}
                    />
                  )),
                )}
              </Routes>
            </div>
          </div>
        </div>
      )}
    </Paper>
  );
}

ViolationAdmin.displayName = "/src/layout/violation-admin.jsx";

export default ViolationAdmin;
