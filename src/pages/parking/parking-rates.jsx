import { useQuery } from "@apollo/client";
import { GET_PARKING_RATES, GET_PARKING_RATE_BY_ID } from "@/graphql/queries";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import CardHeader from "@/components/CardHeader";
import RegularSnackBar from "@/components/Notification/RegularSnackBar";
import DropdownTextField from "@/components/TextFields/DropdownTextField";
import { Box } from "@mui/material";
import ParkingRatesTable from "@/components/Table/ParkingRatesTable";
import CreateParkingRatesModal from "@/components/ModalForms/ParkingRate/CreateParkingRatesModal";

export function ParkingRates() {
  const [optionSelected, setOptionSelected] = useState();
  const { loading, error, data, refetch } = useQuery(GET_PARKING_RATE_BY_ID, {
    variables: {
      parkingLotId: (optionSelected && optionSelected.id) || "",
    },
  });

  const pageTitle = "Parking Rates";
  const [parkingRates, setParkingRates] = useState();
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
    "updatedAt",
    "createdAt",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState({
    updateSnack: false,
    createSnack: false,
    deleteSnack: false,
  });

  useEffect(() => {
    if (data) {
      setParkingRates(data.getParkingRateByLotId);
      setTableHead(
        data.getParkingRateByLotId.length > 0 &&
          Object.keys(data.getParkingRateByLotId[0]),
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
  };

  console.log("PARKING RATES: ", data);

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
            <ParkingRatesTable
              data={parkingRates}
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
                Add New Parking Rates
              </button>
            </ParkingRatesTable>
            <CreateParkingRatesModal
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
                  ? "Parking Rate Update Successful!"
                  : openSnack.createSnack
                    ? "Parking RAte Added Successfully!"
                    : openSnack.deleteSnack
                      ? "Parking Rate Deleted Successfully!"
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

export default ParkingRates;
