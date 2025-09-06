import { createTheme } from "@mui/material/styles";

// Professional color palette inspired by trust, compassion, and growth
const theme = createTheme({
  palette: {
    primary: {
      main: "#1B365D", // Deep Navy Blue - Trust, stability, professionalism
      light: "#4A6FA5",
      dark: "#0F1B2E",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#D4A574", // Warm Gold - Compassion, warmth, hope
      light: "#E6C49A",
      dark: "#B8924F",
      contrastText: "#1B365D",
    },
    background: {
      default: "#FAFBFC", // Clean white with subtle warmth
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2C3E50", // Dark blue-gray for excellent readability
      secondary: "#5A6C7D",
    },
    success: {
      main: "#6B8E7F", // Sage Green - Growth, healing, nature
      light: "#8FA89C",
      dark: "#4A6B5C",
    },
    warning: {
      main: "#F4A261",
      light: "#F6B584",
      dark: "#E8944A",
    },
    error: {
      main: "#DC3545",
      light: "#F1959B",
      dark: "#A71E2A",
    },
    info: {
      main: "#17A2B8",
      light: "#7BC3D1",
      dark: "#117A8B",
    },
    grey: {
      50: "#F8F9FA",
      100: "#E9ECEF",
      200: "#DEE2E6",
      300: "#CED4DA",
      400: "#ADB5BD",
      500: "#6C757D",
      600: "#495057",
      700: "#343A40",
      800: "#212529",
      900: "#1B365D",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h2: {
      fontSize: "2.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h3: {
      fontSize: "2.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
      "@media (max-width:600px)": {
        fontSize: "1.75rem",
      },
    },
    h4: {
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: 1.4,
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "12px 24px",
          fontSize: "1rem",
          fontWeight: 500,
        },
        contained: {
          boxShadow: "0 4px 12px rgba(46, 82, 102, 0.2)",
          "&:hover": {
            boxShadow: "0 6px 16px rgba(46, 82, 102, 0.3)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          "&:hover": {
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "24px",
          paddingRight: "24px",
          "@media (max-width:600px)": {
            paddingLeft: "16px",
            paddingRight: "16px",
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
