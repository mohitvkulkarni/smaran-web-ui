import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { useContactForm } from "../../hooks/useContactForm";
import { emailService } from "../../services/emailService";
import Notification from "../Notification/Notification";

interface ContactFormProps {
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmitSuccess,
  onSubmitError,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const {
    formData,
    validationErrors,
    isSubmitting,
    submitStatus,
    updateField,
    validateForm,
    setSubmitting,
    setSubmitStatus,
    resetForm,
    isFormValid,
  } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      // Focus on first error field for better accessibility
      const firstErrorField = Object.keys(validationErrors)[0];
      if (firstErrorField) {
        const fieldElement = document.querySelector(
          `[name="${firstErrorField}"]`
        ) as HTMLElement;
        fieldElement?.focus();
      }
      return;
    }

    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await emailService.sendContactForm(formData);

      if (result.success) {
        setSubmitStatus("success");
        // Reset form after successful submission
        setTimeout(() => {
          resetForm();
          setSubmitStatus("idle");
        }, 3000);
        onSubmitSuccess?.();
      } else {
        setSubmitStatus("error");
        onSubmitError?.(result.message);
        // Auto-hide error after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";
      onSubmitError?.(errorMessage);
      // Auto-hide error after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFallbackEmail = () => {
    emailService.openMailtoFallback(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      role="form"
      aria-label="Contact form"
      sx={{
        p: 4,
        backgroundColor: "white",
        borderRadius: 3,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        component="h3"
        id="contact-form-title"
        sx={{
          fontWeight: 600,
          color: theme.palette.primary.main,
          mb: 3,
          textAlign: "center",
        }}
      >
        Send us a Message
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={() => updateField("name", formData.name)} // Trigger validation on blur
            error={!!validationErrors.name}
            helperText={validationErrors.name || "Enter your full name"}
            required
            disabled={isSubmitting}
            inputProps={{
              "aria-label": "Full name",
              maxLength: 50,
              name: "name",
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
                "&.Mui-focused": {
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            onBlur={() => updateField("email", formData.email)}
            error={!!validationErrors.email}
            helperText={
              validationErrors.email || "We'll use this to respond to you"
            }
            required
            disabled={isSubmitting}
            inputProps={{
              "aria-label": "Email address",
              name: "email",
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
                "&.Mui-focused": {
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number (Optional)"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            onBlur={() => updateField("phone", formData.phone || "")}
            error={!!validationErrors.phone}
            helperText={
              validationErrors.phone ||
              "Optional - Include country code for international numbers"
            }
            disabled={isSubmitting}
            inputProps={{
              "aria-label": "Phone number (optional)",
              name: "phone",
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
                "&.Mui-focused": {
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            onBlur={() => updateField("message", formData.message)}
            error={!!validationErrors.message}
            helperText={
              validationErrors.message ||
              `${formData.message.length}/1000 characters - Tell us how we can help`
            }
            required
            disabled={isSubmitting}
            inputProps={{
              "aria-label": "Your message",
              maxLength: 1000,
              name: "message",
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
                "&.Mui-focused": {
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                },
              },
            }}
          />
        </Grid>

        {submitStatus === "success" && (
          <Grid item xs={12}>
            <Alert severity="success" role="alert" sx={{ borderRadius: 2 }}>
              Thank you for your message! We'll get back to you soon.
            </Alert>
          </Grid>
        )}

        {submitStatus === "error" && (
          <Grid item xs={12}>
            <Alert
              severity="error"
              id="form-error-message"
              role="alert"
              sx={{ borderRadius: 2 }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={handleFallbackEmail}
                  aria-label="Open email client as fallback"
                  sx={{ textDecoration: "underline" }}
                >
                  Try Email Client
                </Button>
              }
            >
              Failed to send message. Please try again or use the email client
              option.
            </Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isSubmitting || !isFormValid()}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : <Send />}
            aria-describedby={
              submitStatus === "error" ? "form-error-message" : undefined
            }
            sx={{
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              borderRadius: 3,
              backgroundColor: theme.palette.secondary.main,
              boxShadow: "0 8px 25px rgba(244, 162, 97, 0.3)",
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
                boxShadow: "0 12px 35px rgba(244, 162, 97, 0.4)",
                transform: "translateY(-2px)",
              },
              "&:disabled": {
                backgroundColor: theme.palette.grey[300],
                boxShadow: "none",
                transform: "none",
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </Grid>
      </Grid>

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
      />
    </Box>
  );
};

export default ContactForm;
