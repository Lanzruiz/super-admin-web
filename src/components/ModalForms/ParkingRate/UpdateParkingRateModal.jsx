import React, { useEffect, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { Button, Typography } from "@material-tailwind/react";
import FormLabel from "../../Forms/FormLabel";
import FormTextField from "../../Forms/FormTextField";
import { useMutation, useQuery } from "@apollo/client";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import MapComponent from "@/components/Map/MapComponent";
import { EDIT_PARKING_RATE, EDIT_PARKING_SLOT } from "@/graphql/mutations";

export default function UpdateParkingRateModal({
  openUpdateModal,
  closeModal,
  rowData,
  title,
  refetchData,
  toggleSnack,
}) {
  const [updateParkingRate, { loading: updateParkingLotLoading }] =
    useMutation(EDIT_PARKING_RATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    parkingLotId: rowData.parkingLotId,
    parkingRateName: rowData.parkingRateName,
    firstXHoursRate: rowData.firstXHoursRate,
    firstXHours: rowData.firstXHours,
    succeedingHoursRate: rowData.succeedingHoursRate,
    vehicleType: rowData.vehicleType,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChangeNumber = (event) => {
    const { name, value } = event.target;
    const newValue = event.target.value.replace(/[^0-9.-]/g, "");
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await updateParkingRate({
        variables: {
          id: rowData.id,
          parkingRateInput: {
            parkingLotId: formData.parkingLotId,
            parkingRateName: formData.parkingRateName,
            vehicleType: formData.vehicleType,
            firstXHours: parseInt(formData.firstXHours),
            firstXHoursRate: parseFloat(formData.firstXHoursRate),
            succeedingHoursRate: parseFloat(formData.succeedingHoursRate),
          },
        },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      toggleSnack("updateSnack");
      setLoading(false);
      refetchData();
      closeModal();
    }
  };

  return (
    <ModalWrapper
      open={openUpdateModal}
      onClose={closeModal}
      containerSize={"xs"}
    >
      <Paper
        sx={{
          padding: 3,
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          display: "flex",
          height: "600px",
        }}
        variant="outlined"
      >
        <Box
          sx={{
            flexDirection: "column",
            mt: 2,
          }}
        >
          <Typography
            variant="h4"
            className="text-primary"
            style={{ textAlign: "left" }}
          >
            Update Parking Rate
          </Typography>

          <Box sx={{ py: 1 }}>
            {/* <Typography className="">
              {parkingLotData ? parkingLotData.parkingLotName : ""}
            </Typography> */}
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid spacing={2} container sx={{}}>
              <Grid item xs={12}>
                <FormLabel>Parking Rate Name*</FormLabel>
                <FormTextField
                  name="parkingRateName"
                  value={formData.parkingRateName}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Vehicle Type*</FormLabel>
                <FormTextField
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>First X Hours*</FormLabel>
                <FormTextField
                  name="firstXHours"
                  value={formData.firstXHours}
                  onChange={(e) => handleChangeNumber(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>First X Hours Rate*</FormLabel>
                <FormTextField
                  name="firstXHoursRate"
                  value={formData.firstXHoursRate}
                  onChange={(e) => handleChangeNumber(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Succeeding Hours Rate*</FormLabel>
                <FormTextField
                  name="succeedingHoursRate"
                  value={formData.succeedingHoursRate}
                  onChange={(e) => handleChangeNumber(e)}
                />
              </Grid>

              <Grid item xs={12} mt={4}>
                <Button
                  fullWidth
                  type="submit"
                  className="bg-primary"
                  onClick={handleSubmit}
                >
                  Update Parking Rate
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </ModalWrapper>
  );
}
