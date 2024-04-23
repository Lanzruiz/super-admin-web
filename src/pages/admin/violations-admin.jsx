import { Card, Typography } from "@material-tailwind/react";
import { useQuery } from "@apollo/client";
import {
  GET_ROLES,
  GET_VIOLATIONS,
  GET_VIOLATION_WEB_USER,
  GET_WEB_USERS,
} from "@/graphql/queries";
import { useEffect, useState } from "react";
import Table from "@/components/Table/Table";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import NavBar from "@/components/NavBar/NavBar";
import routes from "@/routes";
import CardHeader from "@/components/CardHeader";
import Table2 from "@/components/Table/Table2";
import CreateViolationAdminModal from "@/components/ModalForms/ViolationAdmin/CreateViolationAdminModal";
import RegularSnackBar from "@/components/Notification/RegularSnackBar";

export function ViolationsAdmin() {
  const { loading, error, data, refetch } = useQuery(GET_VIOLATION_WEB_USER);
  const [webUsers, setWebUsers] = useState();
  const [tableHead, setTableHead] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState({
    updateUserSnack: false,
    createAdminSnack: false,
    deleteUserSnack: false,
  });
  const [roleName, setRoleName] = useState();

  const handleOpenModal = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClose = () => {
    setOpenSnack({
      updateUserSnack: false,
      createAdminSnack: false,
      deleteUserSnack: false,
    });
  };

  const handleToggle = (key) => {
    setOpenSnack({
      ...openSnack,
      [key]: !openSnack[key],
    });
  };

  const filterTableHeads = [
    "__typename",
    "id",
    "vehicleId",
    "violationTypeId",
    "updatedAt",
    "token",
    "status",
    "roleId",
    "password",
    "createdBy",
    "updatedBy",
    "fullName",
    "createdAt",
    "address",
  ];
  const tHeaders = [
    // 'violationType',
    "violationName",
    "description",
    "plateNumber",
    "status",
    // 'officer',
    "timestamp",
  ];

  useEffect(() => {
    if (data) {
      setWebUsers(
        data.violationWebUser.filter(
          (ea) => ea.role && ea.role.roleName === "Violation Admin",
        ),
      );
      setTableHead(
        data &&
          data.violationWebUser.length !== 0 &&
          Object.keys(data.violationWebUser[0]),
      );
      setRoleName(data && Object.keys(data)[0]);
    }
  }, [data]);

  return (
    <main className="m-0 flex-wrap justify-evenly overflow-y-auto border-l px-4 pl-4 md:flex-nowrap">
      <div className="w-full ">
        <CardHeader title={"Violations Admin"} />
        {loading ? (
          <div className="flex h-screen items-center justify-center">
            <LoadingScreen size={5} color="blue" className="mr-2" />
            <span>Loading...</span>
          </div>
        ) : (
          <div>
            <Table2
              data={webUsers}
              dataProperty={roleName}
              filterKeysValues={filterTableHeads}
              itemsPerPage={6}
              objectCellFinder="roleName"
              refetchData={refetch}
              triggerNotif={handleToggle}
              modalTitle={"Violation Admin"}
            >
              <button
                className="rounded-xl bg-primary p-4 text-white"
                onClick={handleOpenModal}
              >
                Add New Admin
              </button>
            </Table2>
            <CreateViolationAdminModal
              openModal={isOpen}
              closeModal={handleOpenModal}
              refetchData={refetch}
              triggerNotif={handleToggle}
            />
            <RegularSnackBar
              open={
                openSnack.updateUserSnack ||
                openSnack.createAdminSnack ||
                openSnack.deleteUserSnack
              }
              handleClose={handleClose}
              duration={1000}
              message={
                openSnack.updateUserSnack
                  ? "Update Successful!"
                  : openSnack.createAdminSnack
                    ? "User Created Successfully!"
                    : openSnack.deleteUserSnack
                      ? "User Deleted Successfully!"
                      : ""
              }
              severity={"success"}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default ViolationsAdmin;
