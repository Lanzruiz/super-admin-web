import React, { useEffect, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { Button, Typography } from "@material-tailwind/react";
import FormLabel from "../../Forms/FormLabel";
import FormTextField from "../../Forms/FormTextField";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PARKING_SLOT } from "@/graphql/mutations";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import MapComponent from "@/components/Map/MapComponent";

export default function CreateParkingSlotModal({
  openModal,
  closeModal,
  refetchData,
  triggerNotif,
  parkingLotData,
}) {
  const [createParkingSlot, { loading: createUserLoading }] =
    useMutation(CREATE_PARKING_SLOT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    parkingLotId: parkingLotData ? parkingLotData.id : "",
    parkingSlotName: "",
    slotType: "",
    long_top_left: "",
    long_top_right: "",
    long_bot_left: "",
    long_bot_right: "",
    lat_top_left: "",
    lat_top_right: "",
    lat_bot_left: "",
    lat_bot_right: "",
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
      const { data } = await createParkingSlot({
        variables: {
          parkingSlotInput: {
            parkingLotId: formData.parkingLotId,
            parkingSlotName: formData.parkingSlotName,
            slotType: formData.slotType,
            status: "AVAILABLE",
            longitude: {
              top_left: formData.long_top_left,
              top_right: formData.long_bot_right,
              bottom_left: formData.long_bot_left,
              bottom_right: formData.long_bot_right,
            },
            latitude: {
              top_left: formData.lat_top_left,
              top_right: formData.lat_top_right,
              bottom_left: formData.lat_bot_left,
              bottom_right: formData.lat_bot_right,
            },
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
    <ModalWrapper open={openModal} onClose={closeModal} containerSize={"md"}>
      <Paper
        sx={{
          padding: 2,
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          display: "flex",
          height: "650px",
        }}
        variant="outlined"
      >
        <Box
          sx={{
            mr: 2,
            display: "flex",
            height: "600px",
            width: "450px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapComponent
            longitude={(parkingLotData && parkingLotData.longitude) || 0}
            latitude={(parkingLotData && parkingLotData.latitude) || 0}
            zoom={(parkingLotData && parkingLotData.initialZoom) || 20}
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
            Create Parking Slot
          </Typography>

          <Box sx={{ py: 1 }}>
            <Typography className="">
              {parkingLotData ? parkingLotData.location : ""}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid spacing={1} container sx={{}}>
              <Grid item xs={12}>
                <FormLabel>Parking Slot Name*</FormLabel>
                <FormTextField
                  name="parkingSlotName"
                  value={formData.parkingSlotName}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Slot Type*</FormLabel>
                <FormTextField
                  name="slotType"
                  value={formData.slotType}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography className="font-bold text-primary">
                  Longitude
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <FormLabel>Top Left*</FormLabel>
                <FormTextField
                  name="long_top_left"
                  value={formData.long_top_left}
                  onChange={(e) => handleChangeNumber(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Top Right*</FormLabel>
                <FormTextField
                  name="long_top_right"
                  value={formData.long_top_right}
                  onChange={(e) => handleChangeNumber(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Bottom Left*</FormLabel>
                <FormTextField
                  name="long_bot_left"
                  value={formData.long_bot_left}
                  onChange={(e) => handleChangeNumber(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Bottom Right*</FormLabel>
                <FormTextField
                  name="long_bot_right"
                  value={formData.long_bot_right}
                  onChange={(e) => handleChangeNumber(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography className="font-bold text-primary">
                  Latitude
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <FormLabel>Top Left*</FormLabel>
                <FormTextField
                  name="lat_top_left"
                  value={formData.lat_top_left}
                  onChange={(e) => handleChangeNumber(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Top Right*</FormLabel>
                <FormTextField
                  name="lat_top_right"
                  value={formData.lat_top_right}
                  onChange={(e) => handleChangeNumber(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Bottom Left*</FormLabel>
                <FormTextField
                  name="lat_bot_left"
                  value={formData.lat_bot_left}
                  onChange={(e) => handleChangeNumber(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Bottom Right*</FormLabel>
                <FormTextField
                  name="lat_bot_right"
                  value={formData.lat_bot_right}
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
                  Create Parking Slot
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </ModalWrapper>
  );
}
