import React, { useEffect, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { Button, Typography } from "@material-tailwind/react";
import FormLabel from "../../Forms/FormLabel";
import FormTextField from "../../Forms/FormTextField";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PARKING_LOT } from "@/graphql/mutations";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import MapComponent from "@/components/Map/MapComponent";

export default function CreateParkingLotModal({
  openModal,
  closeModal,
  refetchData,
  triggerNotif,
}) {
  const [createParkingLot, { loading: createParkingLotLoading }] =
    useMutation(CREATE_PARKING_LOT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    // parkingLotId: parkingLotData ? parkingLotData.id : "",
    initialZoom: "",
    latitude: "",
    longitude: "",
    location: "",
    parkingLotName: "",
    totalSlots: "",
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
      const { data } = await createParkingLot({
        variables: {
          parkingLotInput: {
            initialZoom: parseFloat(formData.initialZoom),
            latitude: formData.latitude,
            longitude: formData.longitude,
            location: formData.location,
            parkingLotName: formData.location,
            totalSlots: parseInt(formData.totalSlots),
          },
        },
      });
      if (data) {
        triggerNotif("createSnack");
        refetchData();
        closeModal();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper open={openModal} onClose={closeModal} containerSize={"md"}>
      <Paper
        sx={{
          padding: 2,
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          display: "flex",
          height: "440px",
        }}
        variant="outlined"
      >
        <Box
          sx={{
            mr: 2,
            display: "flex",
            height: "380px",
            width: "450px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapComponent
            longitude={formData.longitude}
            latitude={formData.latitude}
            zoom={formData.initialZoom}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "400px",
            width: "400px",
            flexDirection: "column",
            mt: 2,
          }}
        >
          <Typography
            variant="h4"
            className="text-primary"
            style={{ textAlign: "left" }}
          >
            Create Parking Lot
          </Typography>

          <Box sx={{ py: 1 }}>
            {/* <Typography className="">
              {parkingLotData ? parkingLotData.location : ""}
            </Typography> */}
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid spacing={4} container sx={{}}>
              <Grid item xs={12}>
                <FormLabel>Location Name*</FormLabel>
                <FormTextField
                  name="location"
                  value={formData.location}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Latitude*</FormLabel>
                <FormTextField
                  name="latitude"
                  value={formData.latitude}
                  onChange={(e) => handleChangeNumber(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Longitude*</FormLabel>
                <FormTextField
                  name="longitude"
                  value={formData.longitude}
                  onChange={(e) => handleChangeNumber(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Initial Zoom*</FormLabel>
                <FormTextField
                  name="initialZoom"
                  value={formData.initialZoom}
                  onChange={(e) => handleChangeNumber(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Total Slots*</FormLabel>
                <FormTextField
                  name="totalSlots"
                  value={formData.totalSlots}
                  onChange={(e) => handleChangeNumber(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  className="bg-primary"
                  onClick={handleSubmit}
                >
                  Create Parking Lot
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </ModalWrapper>
  );
}
