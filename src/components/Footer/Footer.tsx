import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
  useTheme,
} from "@mui/material";
import { Email, LocationOn } from "@mui/icons-material";
import styles from "./Footer.module.scss";

interface FooterProps {
  onOpenPolicy: (type: "privacy" | "terms") => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      className={styles.footer}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "white",
        pt: 6,
        pb: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box className={styles.footerPattern} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: theme.palette.secondary.main,
              }}
            >
              Smaran Foundation
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Email
                sx={{
                  fontSize: 18,
                  mr: 1,
                  color: theme.palette.secondary.main,
                }}
              />
              <Link
                href="mailto:sanjana@smaranfoundation.org"
                color="inherit"
                underline="hover"
                sx={{ fontSize: "0.875rem" }}
              >
                sanjana@smaranfoundation.org
              </Link>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationOn
                sx={{
                  fontSize: 18,
                  mr: 1,
                  color: theme.palette.secondary.main,
                }}
              />
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                Bangalore, Karnataka, India
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component="h4"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: theme.palette.secondary.main,
              }}
            >
              Our Focus Areas
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                "Education for Every Child",
                "Disability Support & Inclusion",
                "Mental Health & Well-being",
                "Women's Empowerment",
                "Geriatric Care",
                "Environmental Sustainability",
              ].map((area) => (
                <Typography
                  key={area}
                  variant="body2"
                  sx={{
                    opacity: 0.9,
                    fontSize: "0.875rem",
                    "&:hover": {
                      opacity: 1,
                      color: theme.palette.secondary.main,
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {area}
                </Typography>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component="h4"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: theme.palette.secondary.main,
              }}
            >
              Legal & Policies
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => onOpenPolicy("privacy")}
                sx={{
                  color: "inherit",
                  textAlign: "left",
                  textDecoration: "none",
                  opacity: 0.9,
                  fontSize: "0.875rem",
                  "&:hover": {
                    opacity: 1,
                    color: theme.palette.secondary.main,
                    textDecoration: "underline",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Privacy Policy
              </Link>
              <Link
                component="button"
                variant="body2"
                onClick={() => onOpenPolicy("terms")}
                sx={{
                  color: "inherit",
                  textAlign: "left",
                  textDecoration: "none",
                  opacity: 0.9,
                  fontSize: "0.875rem",
                  "&:hover": {
                    opacity: 1,
                    color: theme.palette.secondary.main,
                    textDecoration: "underline",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Terms of Service
              </Link>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                }}
              >
                We are committed to transparency and ethical practices in all
                our work. Our policies reflect our dedication to privacy and
                responsible engagement.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.2)" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              fontSize: "0.875rem",
            }}
          >
            © {currentYear} Smaran Foundation. All rights reserved.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              fontSize: "0.875rem",
              fontStyle: "italic",
            }}
          >
            "To remember is to care, and caring calls us to act."
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
