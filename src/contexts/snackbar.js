import { Alert, Snackbar } from '@mui/material';

const { createContext, useContext, useMemo, useState } = require('react');

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: '',
    severity: 'info',
  });

  const handleSnackbar = useMemo(
    () => ({
      close: (_, reason) => {
        if (reason === 'clickaway') return;

        setSnackbar((prev) => ({
          ...prev,
          isOpen: false,
        }));
      },
      open: (message = 'Hello', severity = 'info') => {
        setSnackbar({
          isOpen: true,
          message: message,
          severity: severity,
        });
      },
    }),
    [],
  );

  return (
    <SnackbarContext.Provider value={handleSnackbar}>
      {children}

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={5000}
        open={snackbar.isOpen}
        onClose={handleSnackbar.close}
      >
        <Alert
          onClose={handleSnackbar.close}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
