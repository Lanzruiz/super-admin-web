import React, { useEffect, useState } from "react";
import Modal2 from "../../Modal2";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { Button, Typography } from "@material-tailwind/react";
import FormLabel from "../../Forms/FormLabel";
import FormTextField from "../../Forms/FormTextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, ref } from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ROLES } from "@/graphql/queries";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  CREATE_PARKING_SITE_WEB_USER,
  CREATE_WEB_USER,
} from "@/graphql/mutations";

export default function CreateParkingSiteManager({
  openModal,
  closeModal,
  refetchData,
  triggerNotif,
}) {
  const { data, loading: rolesLoading } = useQuery(GET_ROLES);
  const [roles, setRoles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [createParkingsiteWeUser, { loading: createParkingsiteWeUserLoading }] =
    useMutation(CREATE_PARKING_SITE_WEB_USER);
  const [error, setError] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (data) {
      setRoles(
        data.role.filter(
          (element) => element.roleName === "Parking Site Manager",
        ),
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
    <Modal2 isOpen={openModal} onClose={closeModal}>
      <Box style={{ marginBottom: 16 }}>
        <Typography
          variant="h4"
          className="text-primary"
          style={{ textAlign: "left" }}
        >
          Create Parking Site Manager
        </Typography>
      </Box>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const { data } = await createParkingsiteWeUser({
                variables: {
                  parkingsiteWebUserInput: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    roleId: values.roleId,
                    password: values.password,
                  },
                },
              });
            } catch (error) {
              setError(error);
            } finally {
              setSubmitting(false);
              triggerNotif("createAdminSnack");
              refetchData();
              closeModal();
            }
          }}
        >
          {({ isSubmitting, setSubmitting, setFieldValue, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Grid spacing={4} container>
                <Grid item xs={12} md={6}>
                  <Field
                    size="small"
                    variant="outlined"
                    name="firstName"
                    as={TextField}
                    label="First Name"
                    fullWidth
                  />
                  <ErrorMessage name="firstName">
                    {(msg) => (
                      <div
                        style={{ color: "red", paddingLeft: 5, fontSize: 11 }}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    size="small"
                    variant="outlined"
                    name="lastName"
                    as={TextField}
                    label="Last Name"
                    fullWidth
                  />
                  <ErrorMessage name="lastName">
                    {(msg) => (
                      <div
                        style={{ color: "red", paddingLeft: 5, fontSize: 11 }}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    size="small"
                    variant="outlined"
                    name="email"
                    as={TextField}
                    label="Email"
                    fullWidth
                  />
                  <ErrorMessage name="email">
                    {(msg) => (
                      <div
                        style={{ color: "red", paddingLeft: 5, fontSize: 11 }}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    size="small"
                    variant="outlined"
                    name="phoneNumber"
                    as={TextField}
                    label="Phone Number"
                    fullWidth
                  />
                  <ErrorMessage name="phoneNumber">
                    {(msg) => (
                      <div
                        style={{ color: "red", paddingLeft: 5, fontSize: 11 }}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    size="small"
                    variant="outlined"
                    name="roleId"
                    as={TextField}
                    select
                    label="Role"
                    fullWidth
                    onChange={(event) => {
                      setFieldValue("roleId", event.target.value);
                    }}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.roleName}
                      </MenuItem>
                    ))}
                  </Field>

                  <ErrorMessage name="roleId">
                    {(msg) => (
                      <div
                        style={{ color: "red", paddingLeft: 5, fontSize: 11 }}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    size="small"
                    variant="outlined"
                    name="password"
                    as={TextField}
                    label="Password"
                    type={showPassword ? "text" : "password"} // Show password if showPassword is true
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ErrorMessage name="password">
                    {(msg) => (
                      <div
                        style={{ color: "red", paddingLeft: 5, fontSize: 11 }}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    size="small"
                    variant="outlined"
                    name="confirmPassword"
                    as={TextField}
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"} // Show password if showPassword is true
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ErrorMessage name="confirmPassword">
                    {(msg) => (
                      <div
                        style={{ color: "red", paddingLeft: 5, fontSize: 11 }}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
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
    </Modal2>
  );
}
