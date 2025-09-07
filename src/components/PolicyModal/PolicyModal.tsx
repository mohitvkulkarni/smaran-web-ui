import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import styles from "./PolicyModal.module.scss";

interface PolicyModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({
  title,
  content,
  onClose,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      className={styles.policyModal}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: isMobile ? 0 : 3,
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          backgroundColor: theme.palette.primary.main,
          color: "white",
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <Box
          className={`${styles.policyContent} blog-content`}
          sx={{
            "& p": {
              mb: 2,
              lineHeight: 1.7,
              color: theme.palette.text.primary,
            },
            "& h2": {
              color: theme.palette.primary.main,
              fontWeight: 600,
              mt: 3,
              mb: 2,
              fontSize: "1.5rem",
            },
            "& h3": {
              color: theme.palette.primary.main,
              fontWeight: 600,
              mt: 2,
              mb: 1,
              fontSize: "1.25rem",
            },
            "& ul, & ol": {
              mb: 2,
              pl: 3,
              "& li": {
                mb: 1,
                lineHeight: 1.6,
              },
            },
            "& strong": {
              color: theme.palette.primary.main,
              fontWeight: 600,
            },
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontStyle: "italic",
            }}
          >
            If you have any questions about this {title.toLowerCase()}, please
            contact us at <strong>info@smaranfoundation.org</strong>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyModal;
