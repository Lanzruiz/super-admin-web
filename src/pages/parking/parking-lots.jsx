import { Card, Typography } from "@material-tailwind/react";
import { useQuery } from "@apollo/client";
import { GET_PARKING_LOTS, GET_VIOLATIONS } from "@/graphql/queries";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import CardHeader from "@/components/CardHeader";
import ParkingLotsTable from "@/components/Table/ParkingLotsTable";
import RegularSnackBar from "@/components/Notification/RegularSnackBar";
import CreateParkingLotModal from "@/components/ModalForms/ParkingLot/CreateParkingLotModal";

export function ParkingLots() {
  const pageTitle = "Parking Lots";
  const { loading, error, data, refetch } = useQuery(GET_PARKING_LOTS);
  const [parkingLots, setParkingLots] = useState();
  const [tableHead, setTableHead] = useState();
  const filterTableHeads = [
    "__typename",
    "id",
    "initialZoom",
    "longitude",
    "latitude",
    "parkingSlots",
    "parkingRates",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState({
    updateSnack: false,
    createSnack: false,
    deleteSnack: false,
  });

  useEffect(() => {
    if (data) {
      setParkingLots(data.parkingLots);
      setTableHead(data && Object.keys(data.parkingLots[0]));
    }
  }, [data]);

  const handleOpenModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpenSnack({
      updateSnack: false,
      createSnack: false,
      deleteSnack: false,
    });
  };

  const handleToggle = (key) => {
    setOpenSnack({
      ...openSnack,
      [key]: !openSnack[key],
    });
  };

  return (
    <div className="m-0 flex-wrap justify-evenly overflow-y-auto border-l px-4 pl-4 md:flex-nowrap">
      <div className="w-full ">
        <CardHeader title={pageTitle} />
        {loading ? (
          <div className="flex h-screen items-center justify-center">
            <LoadingScreen size={5} color="blue" className="mr-2" />
            <span>Loading...</span>
          </div>
        ) : (
          <div>
            <ParkingLotsTable
              data={parkingLots}
              filterKeysValues={filterTableHeads}
              itemsPerPage={6}
              customCell={"status"}
              modalTitle={pageTitle}
              refetchData={refetch}
              triggerNotif={handleToggle}
            >
              <button
                className="rounded-xl bg-primary p-4 text-white"
                onClick={handleOpenModal}
              >
                Add New Parking Lot
              </button>
            </ParkingLotsTable>
            <CreateParkingLotModal
              openModal={isOpen}
              closeModal={handleOpenModal}
              triggerNotif={handleToggle}
              refetchData={refetch}
            />
            <RegularSnackBar
              open={
                openSnack.updateSnack ||
                openSnack.createSnack ||
                openSnack.deleteSnack
              }
              handleClose={handleClose}
              duration={1500}
              message={
                openSnack.updateSnack
                  ? "Parking Lot Update Successful!"
                  : openSnack.createSnack
                    ? "Parking Lot Added Successfully!"
                    : openSnack.deleteSnack
                      ? "Parking Lot Deleted Successfully!"
                      : ""
              }
              severity={"success"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ParkingLots;
