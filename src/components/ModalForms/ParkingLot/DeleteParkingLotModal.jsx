import ModalWrapper from "@/components/Modal/ModalWrapper";
import Modal2 from "@/components/Modal2";
import RegularSnackBar from "@/components/Notification/RegularSnackBar";
import { DELETE_PARKING_LOT, DELETE_USER } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import {
  Box,
  Paper,
  Typography,
  Button,
  Snackbar,
  Slide,
  SnackbarContent,
  Alert,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";

export default function DeleteParkingLotModal({
  openDeleteModal,
  closeDeleteModal,
  rowData,
  refetchData,
  toggleSnack,
}) {
  const [deleteParkingLot] = useMutation(DELETE_PARKING_LOT);
  const [openSnack, setOpenSnack] = useState(false);

  const handleClose = () => {
    setOpenSnack(false);
  };

  const handleDelete = async () => {
    try {
      const { data } = await deleteParkingLot({
        variables: {
          deleteParkingLotId: rowData.id,
        },
      });
      toggleSnack("deleteSnack");
      refetchData();
      closeDeleteModal();
    } catch (error) {}
  };
  return (
    <ModalWrapper
      open={openDeleteModal}
      onClose={closeDeleteModal}
      containerSize="xs"
    >
      <Paper
        style={{
          padding: 16,
        }}
        variant="outlined"
      >
        <Box
          style={{
            textAlign: "center",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              p={2}
              mb={2}
              color={red[500]}
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              Deleting Parking Lot
            </Typography>
          </Box>
          <Box>
            <Typography>
              Are you sure you want to delete{" "}
              <strong>{rowData.location} ?</strong>
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"center"} gap={2} my={2}>
            <Button
              size="large"
              variant="outlined"
              sx={{
                color: "gray",
                borderColor: "gray",
                fontWeight: "bold",
              }}
              onClick={() => closeDeleteModal()}
            >
              Cancel
            </Button>
            <Button
              size="large"
              variant="contained"
              style={{
                backgroundColor: "red",
                fontWeight: "bold",
              }}
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Paper>
    </ModalWrapper>
  );
}
