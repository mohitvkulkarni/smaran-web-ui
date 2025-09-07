import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";
import styles from "./Hero.module.scss";

const Hero: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleScrollToWelcome = () => {
    const element = document.querySelector("#welcome");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      id="home"
      ref={sectionRef}
      className={styles.hero}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        background: "linear-gradient(135deg, #2E5266 0%, #1A3A47 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <Box className={styles.backgroundPattern} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            textAlign: "center",
            color: "white",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          {/* Logo */}
          <Box
            className={`${styles.logo} ${
              isVisible ? "fade-in visible" : "fade-in"
            }`}
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <img
              src="/assets/logo-with-name-at-bottom.png"
              alt="Smaran Foundation Logo"
              style={{
                height: isMobile ? 80 : 120,
                width: "auto",
                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
              }}
            />
          </Box>

          {/* Tagline */}
          <Typography
            variant={isMobile ? "body1" : "h6"}
            component="p"
            className={`${styles.tagline} ${
              isVisible ? "fade-in visible" : "fade-in"
            }`}
            sx={{
              mb: 4,
              opacity: 0.8,
              fontStyle: "italic",
              fontWeight: 300,
              animationDelay: "0.1s",
            }}
          >
            "To remember is to care... love"
          </Typography>

          <Typography
            variant={isMobile ? "h3" : "h1"}
            component="h1"
            className={`${styles.title} ${
              isVisible ? "fade-in visible" : "fade-in"
            }`}
            sx={{
              fontWeight: 700,
              mb: 3,
              background: "linear-gradient(135deg, #ffffff 0%, #F4A261 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animationDelay: "0.2s",
            }}
          >
            Welcome to Smaran Foundation!
          </Typography>

          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="p"
            className={`${styles.subtitle} ${
              isVisible ? "fade-in visible" : "fade-in"
            }`}
            sx={{
              mb: 4,
              opacity: 0.9,
              lineHeight: 1.6,
              fontWeight: 300,
              animationDelay: "0.3s",
            }}
          >
            Smaran is remembrance — of every soul worthy of dignity, compassion,
            and love.
          </Typography>

          <Box
            className={`${styles.ctaContainer} ${
              isVisible ? "fade-in visible" : "fade-in"
            }`}
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              animationDelay: "0.4s",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                const element = document.querySelector("#about");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                backgroundColor: theme.palette.secondary.main,
                color: "white",
                borderRadius: 3,
                boxShadow: "0 8px 25px rgba(244, 162, 97, 0.3)",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                  boxShadow: "0 12px 35px rgba(244, 162, 97, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease-in-out",
              }}
            >
              Learn About Us
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderColor: "white",
                color: "white",
                borderRadius: 3,
                borderWidth: 2,
                "&:hover": {
                  borderColor: theme.palette.secondary.main,
                  backgroundColor: theme.palette.secondary.main,
                  color: "white",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease-in-out",
              }}
            >
              Connect With Us
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Scroll Indicator */}
      <Box
        className={styles.scrollIndicator}
        sx={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
          color: "white",
          opacity: 0.7,
          transition: "opacity 0.3s ease-in-out",
          "&:hover": {
            opacity: 1,
          },
        }}
        onClick={handleScrollToWelcome}
      >
        <ArrowDownward
          sx={{
            fontSize: 32,
            animation: "bounce 2s infinite",
          }}
        />
      </Box>
    </Box>
  );
};

export default Hero;
