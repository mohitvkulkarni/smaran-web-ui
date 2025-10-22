import React from "react";
import { Snackbar, Alert, AlertProps } from "@mui/material";

interface NotificationProps {
  open: boolean;
  message: string;
  severity: AlertProps["severity"];
  onClose: () => void;
  autoHideDuration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 6000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          borderRadius: 2,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
