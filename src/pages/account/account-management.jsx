import FormLabel from '@/components/Forms/FormLabel';
import FormTextField from '@/components/Forms/FormTextField';
import { Button } from '@material-tailwind/react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';

export function AccountManagement() {
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Box
        sx={{
          pb: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
          }}
        >
          Password
        </Typography>
      </Box>

      <Paper
        sx={{
          p: 4,
          width: '30%',
        }}
      >
        <Box>
          <Box>
            <Typography
              variant="h6"
              color={blue[900]}
              mb={2}
              sx={{
                fontWeight: 'bold',
              }}
            >
              Change your password
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormLabel>Old Password</FormLabel>
                <FormTextField />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>New Password</FormLabel>
                <FormTextField />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Confirm Password</FormLabel>
                <FormTextField />
              </Grid>

              <Box py={2} />

              <Grid item xs={12}>
                <Button
                  variant="filled"
                  fullWidth
                  sx={{
                    textAlign: 'center',
                  }}
                  className="bg-primary"
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default AccountManagement;
