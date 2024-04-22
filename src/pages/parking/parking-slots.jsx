import { useQuery } from "@apollo/client";
import { GET_PARKING_LOT_SLOTS } from "@/graphql/queries";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import CardHeader from "@/components/CardHeader";
import RegularSnackBar from "@/components/Notification/RegularSnackBar";
import ParkingSlotsTable from "@/components/Table/ParkingSlotsTable";
import DropdownTextField from "@/components/TextFields/DropdownTextField";
import { Box } from "@mui/material";
import CreateParkingSlotModal from "@/components/ModalForms/ParkingSlot/CreateParkingSlotModal";

export function ParkingSlots() {
  const [optionSelected, setOptionSelected] = useState();
  const { loading, error, data, refetch } = useQuery(GET_PARKING_LOT_SLOTS, {
    variables: { parkingLotId: optionSelected && optionSelected.id },
  });
  const pageTitle = "Parking Slots";
  const [parkingLotSlots, setParkingLotSlots] = useState();
  const [tableHead, setTableHead] = useState();
  const filterTableHeads = [
    "__typename",
    "id",
    "initialZoom",
    "parkingLotId",
    // "longitude",
    // "latitude",
    "lastStatusChange",
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
      setParkingLotSlots(data.parkingLotSlots);
      setTableHead(
        data.parkingLotSlots.length > 0 && Object.keys(data.parkingLotSlots[0]),
      );
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
  const handleOptionSelected = (option) => {
    setOptionSelected(option);
    // Handle the selected option here
  };
  // console.log("TABLE DATA: ", optionSelected);

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
            <ParkingSlotsTable
              data={parkingLotSlots}
              filterKeysValues={filterTableHeads}
              itemsPerPage={6}
              modalTitle={pageTitle}
              refetchData={refetch}
              triggerNotif={handleToggle}
              mapData={optionSelected}
            >
              <Box sx={{ width: "30%" }}>
                <DropdownTextField onOptionSelected={handleOptionSelected} />
              </Box>

              <button
                disabled={optionSelected ? false : true}
                className="rounded-xl bg-primary p-4 text-white"
                onClick={handleOpenModal}
              >
                Add New Parking Slot
              </button>
            </ParkingSlotsTable>
            <CreateParkingSlotModal
              openModal={isOpen}
              parkingLotData={optionSelected}
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
                  ? "Parking Slot Update Successful!"
                  : openSnack.createSnack
                    ? "Parking Slot Added Successfully!"
                    : openSnack.deleteSnack
                      ? "Parking Slot Deleted Successfully!"
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

export default ParkingSlots;
