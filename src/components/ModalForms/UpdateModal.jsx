import { EDIT_VIOLATION_WEB_USER } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import FormLabel from "@/components/Forms/FormLabel";
import FormTextField from "@/components/Forms/FormTextField";
import useRoles from "@/utils/hooks/useRoles";
import { Button, Typography } from "@material-tailwind/react";
import { Box, Grid, Paper } from "@mui/material";
import ModalWrapper from "@/components/Modal/ModalWrapper";

export default function UpdateModal({
  openUpdateModal,
  closeModal,
  rowData,
  title,
  refetchData,
  toggleSnack,
}) {
  const { roles, rolesLoading } = useRoles();
  const [editUser] = useMutation(EDIT_VIOLATION_WEB_USER);
  const [formData, setFormData] = useState({
    id: rowData.id,
    firstName: rowData.firstName || "",
    lastName: rowData.lastName || "",
    email: rowData.email || "",
    phoneNumber: rowData.phoneNumber || "",
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

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await editUser({
        variables: {
          id: formData.id,
          violationWebUserInput: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
          },
        },
      });
    } catch (error) {
      setError(error.message);
    }
    toggleSnack("updateUserSnack");
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
        }}
        variant="outlined"
      >
        <Box p={2}>
          <Box
            style={{
              marginTop: 16,
              marginBottom: 16,
            }}
          >
            <Typography
              variant="h4"
              style={{ fontWeight: "bold" }}
              className="text-primary"
            >
              Update Information
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <FormLabel>First Name</FormLabel>
              <FormTextField
                name="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel>Last Name</FormLabel>
              <FormTextField
                name="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel>Phone Number</FormLabel>
              <FormTextField
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel>Email</FormLabel>
              <FormTextField
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end">
            <Box mt={2}>
              <Button
                variant="filled"
                className="bg-primary"
                onClick={() => {
                  handleUpdate();
                }}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </Button>
            </Box>
          </Box>
          {error && (
            <Box mt={2}>
              <Typography color="error">{error}</Typography>
            </Box>
          )}
        </Box>
        ;
      </Paper>
    </ModalWrapper>
  );
}
