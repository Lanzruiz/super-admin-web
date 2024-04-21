import { EDIT_PARKING_LOT, EDIT_USER } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import FormLabel from "@/components/Forms/FormLabel";
import FormTextField from "@/components/Forms/FormTextField";
import Modal2 from "@/components/Modal2";
import useRoles from "@/utils/hooks/useRoles";
import { Button, Typography } from "@material-tailwind/react";
import { Box, Grid, Paper } from "@mui/material";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import RegularSnackBar from "@/components/Notification/RegularSnackBar";
import MapComponent from "@/components/Map/MapComponent";

export default function UpdateParkingLotModal({
  openUpdateModal,
  closeModal,
  rowData,
  title,
  refetchData,
  toggleSnack,
}) {
  const { roles, rolesLoading } = useRoles();
  const [updateParkingLot] = useMutation(EDIT_PARKING_LOT);
  const [formData, setFormData] = useState({
    id: rowData.id,
    longitude: rowData.longitude || "",
    latitude: rowData.latitude || "",
    initialZoom: rowData.initialZoom || 20,
    totalSlots: rowData.totalSlots || 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  console.log("UPDATE PARKING LOT: ", rowData);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await updateParkingLot({
        variables: {
          updateParkingLotId: formData.id,
          parkingLotInput: {
            longitude: formData.longitude,
            latitude: formData.latitude,
            initialZoom: parseFloat(formData.initialZoom),
            totalSlots: parseInt(formData.totalSlots),
          },
          isWebUser: true,
        },
      });
    } catch (error) {
      setError(error.message);
    }
    toggleSnack("updateSnack");
    setLoading(false);
    refetchData();
    closeModal();
  };

  return (
    <ModalWrapper
      open={openUpdateModal}
      onClose={closeModal}
      containerSize={"sm"}
    >
      <Paper
        style={{
          padding: 16,
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          display: "flex",
        }}
        variant="outlined"
      >
        <Box
          sx={{
            mr: 2,
            display: "flex",
            height: "400px",
            width: "400px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapComponent
            longitude={formData.longitude}
            latitude={formData.latitude}
            zoom={20}
          />
        </Box>

        <Box
          sx={{
            mr: 2,
            flexDirection: "column",
            display: "flex",
            height: "400px",
            width: "300px",
            // alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            className="text-primary"
            style={{ textAlign: "left" }}
          >
            Update Parking Lot
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormLabel>Longitude*</FormLabel>
              <FormTextField
                name="longitude"
                value={formData.longitude}
                onChange={(e) => handleChangeNumber(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Latitude*</FormLabel>
              <FormTextField
                name="latitude"
                value={formData.latitude}
                onChange={(e) => handleChangeNumber(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Initial Zoom*</FormLabel>
              <FormTextField
                name="initialZoom"
                value={formData.initialZoom}
                onChange={(e) => handleChangeNumber(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Total Slots*</FormLabel>
              <FormTextField
                name="totalSlots"
                value={formData.totalSlots}
                onChange={(e) => handleChangeNumber(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button className="w-full bg-primary" onClick={handleUpdate}>
                Update Parking Lot
              </Button>
            </Grid>
          </Grid>
        </Box>

        {error && (
          <Box mt={2}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}
      </Paper>
    </ModalWrapper>
  );
}
