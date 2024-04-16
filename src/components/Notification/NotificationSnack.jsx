import { HighlightOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';

export default function Notification({ message, variant }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //   const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message, {
        // preventDuplicate: true,
        variant: variant.toLowerCase(),
        action: (key) => (
          <IconButton
            style={{
              padding: 8,
            }}
            onClick={() => {
              closeSnackbar(key);
            }}
          >
            <HighlightOff
              style={{
                color: 'currentcolor',
              }}
            />
          </IconButton>
        ),
      });
    }
  }, [message, variant, enqueueSnackbar, closeSnackbar]);

  return null;
}
