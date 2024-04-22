import React, { useEffect, useState } from "react";
import Modal2 from "../../Modal2";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Paper,
} from "@mui/material";
import { Button, Typography } from "@material-tailwind/react";
import FormLabel from "../../Forms/FormLabel";
import FormTextField from "../../Forms/FormTextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, ref } from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ROLES } from "@/graphql/queries";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CREATE_WEB_USER } from "@/graphql/mutations";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import MapComponent from "@/components/Map/MapComponent";

export default function CreateParkingLotModal({
  openModal,
  closeModal,
  refetchData,
  triggerNotif,
}) {
  const { data, loading: rolesLoading } = useQuery(GET_ROLES);
  const [roles, setRoles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, { loading: createUserLoading }] =
    useMutation(CREATE_WEB_USER);
  const [error, setError] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (data) {
      setRoles(
        data.role.filter((element) => element.roleName === "Violation Admin"),
      );
    }
  }, [data]);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    roleId: roles.length > 0 ? roles[0].id : "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = object().shape({
    firstName: string().required("First Name is required"),
    lastName: string().required("Last Name is required"),
    email: string().email("Invalid email").required("Email is required"),
    phoneNumber: string().required("Phone Number is required"),
    roleId: string().required("Role is required"),

    password: string().required("Password is required"),
    confirmPassword: string()
      .oneOf([ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <ModalWrapper open={openModal} onClose={closeModal} containerSize={"sm"}>
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
            longitude={125.6060495}
            latitude={7.0696712}
            zoom={18.75}
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

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const { data } = await createUser({
                  variables: {
                    userInput: {
                      fullName: `${values.firstName} ${values.lastName}`,
                      email: values.email,
                      phoneNumber: values.phoneNumber,
                      roleId: values.roleId,
                      password: values.password,
                      isWebUser: true,
                    },
                  },
                });
              } catch (error) {
                setError(error);
              } finally {
                //   setSubmitting(false);
                //   triggerNotif('createAdminSnack');
                //   refetchData();
                //   closeModal();
              }
            }}
          >
            {({ isSubmitting, setSubmitting, setFieldValue, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Grid spacing={3} container sx={{}}>
                  <Grid item xs={12} mt={2}>
                    <Field
                      size="small"
                      variant="outlined"
                      name="firstName"
                      as={TextField}
                      label="Location Name"
                      fullWidth
                    />
                    {/* <ErrorMessage name="firstName">
                    {(msg) => (
                      <div
                        style={{ color: 'red', paddingLeft: 5, fontSize: 11 }}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      size="small"
                      variant="outlined"
                      name="firstName"
                      as={TextField}
                      label="Latitude"
                      fullWidth
                    />
                    {/* <ErrorMessage name="firstName">
                    {(msg) => (
                      <div
                        style={{ color: 'red', paddingLeft: 5, fontSize: 11 }}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      size="small"
                      variant="outlined"
                      name="firstName"
                      as={TextField}
                      label="Longitude"
                      fullWidth
                    />
                    {/* <ErrorMessage name="firstName">
                    {(msg) => (
                      <div
                        style={{ color: 'red', paddingLeft: 5, fontSize: 11 }}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      size="small"
                      variant="outlined"
                      name="firstName"
                      as={TextField}
                      label="Initial Zoom"
                      fullWidth
                    />
                    {/* <ErrorMessage name="firstName">
                    {(msg) => (
                      <div
                        style={{ color: 'red', paddingLeft: 5, fontSize: 11 }}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage> */}
                  </Grid>
                </Grid>
                <Box display="flex" mt={2} justifyContent="flex-end">
                  <Button
                    type="submit"
                    className="bg-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Create"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </ModalWrapper>
  );
}
