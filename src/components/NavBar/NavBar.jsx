import { useMaterialTailwindController } from "@/context";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import NavHeader from "./NavHeader";
import MainMenuItems from "./MainMenuItems";
import {
  officerMenuItems,
  superAdminMenuItems,
  violationAdminMenuItems,
} from "@/routes";
import Divider from "../Divider";
import { Paper } from "@mui/material";
import NavUser from "./NavUser";

export default function NavBar({ routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  const { state, dispatchAuth } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    // Simulated logout logic
    dispatchAuth({ type: "LOGOUT", payload: { user: null } });
    navigate("/auth/sign-in", { state: { from: location.pathname } });
  };

  return (
    <nav className="flex h-screen flex-col gap-2 border-r p-6">
      <header>
        <NavHeader />
      </header>
      <section className="">
        {/* <NavUser
          userName="John Doe"
          email="whpsmartparkingadmin@gmail.com"
          role="Main Administrator"
        /> */}
      </section>

      <section className="flex-1 overflow-y-auto scrollbar-hide">
        <ul className="flex flex-col gap-1">
          <MainMenuItems menuItems={superAdminMenuItems} />
        </ul>
      </section>
      <footer>
        <Button
          variant={"filled"}
          color={"red"}
          className="my-4 flex items-center gap-4 px-4 capitalize"
          fullWidth
          onClick={handleLogout}
        >
          <ArrowLeftOnRectangleIcon {...icon} />

          <Typography
            color="inherit"
            className="text-base font-medium capitalize md:text-lg lg:text-lg xl:text-lg"
          >
            Logout
          </Typography>
        </Button>
      </footer>

      {/* </div> */}
    </nav>
  );
}
