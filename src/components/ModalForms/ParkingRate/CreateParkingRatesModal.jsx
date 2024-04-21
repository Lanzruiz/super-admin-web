import React, { useEffect, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { Button, Typography } from "@material-tailwind/react";
import FormLabel from "../../Forms/FormLabel";
import FormTextField from "../../Forms/FormTextField";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PARKING_RATE } from "@/graphql/mutations";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import MapComponent from "@/components/Map/MapComponent";

export default function CreateParkingRatesModal({
  openModal,
  closeModal,
  refetchData,
  triggerNotif,
  parkingLotData,
}) {
  const [createParkingRate, { loading: createUserLoading }] =
    useMutation(CREATE_PARKING_RATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    parkingLotId: parkingLotData ? parkingLotData.id : "",
    parkingRateName: "",
    firstXHoursRate: "",
    firstXHours: "",
    succeedingHoursRate: "",
    vehicleType: "",
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
      const { data } = await createParkingRate({
        variables: {
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
      triggerNotif("createSnack");
      setLoading(false);
      refetchData();
      closeModal();
    }
  };

  return (
    <ModalWrapper open={openModal} onClose={closeModal} containerSize={"xs"}>
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
            Add Parking Rate
          </Typography>

          <Box sx={{ py: 1 }}>
            <Typography className="">
              {parkingLotData ? parkingLotData.parkingLotName : ""}
            </Typography>
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
                  Create Parking Rate
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </ModalWrapper>
  );
}
