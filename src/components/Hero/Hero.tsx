import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  keyframes,
} from "@mui/material";
import styles from "./Hero.module.scss";

const Hero: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Define floating animations
  const floatSlow = keyframes`
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
  `;

  const floatMedium = keyframes`
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(-3deg); }
  `;

  const floatFast = keyframes`
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
  `;

  const pulse = keyframes`
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.3; }
  `;

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

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        overflow: "hidden",
        paddingTop: "80px", // Add padding to account for fixed header
        paddingBottom: "80px",
      }}
    >
      {/* Background Pattern */}
      <Box className={styles.backgroundPattern} />

      {/* Left Side Floating Elements - Geometric Shapes */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: { xs: "150px", md: "250px", lg: "300px" },
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {/* Circle - representing unity and wholeness */}
        <Box
          sx={{
            position: "absolute",
            top: "15%",
            left: { xs: "5%", md: "8%" },
            width: { xs: "25px", md: "35px" },
            height: { xs: "25px", md: "35px" },
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            opacity: 0.7,
            animation: `${floatSlow} 8s ease-in-out infinite`,
            transform: `translate(${mousePosition.x * 0.15}px, ${
              mousePosition.y * 0.15
            }px)`,
            transition: "transform 0.3s ease-out",
          }}
        />

        {/* Triangle - representing growth and aspiration */}
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: { xs: "8%", md: "12%" },
            width: { xs: "20px", md: "28px" },
            height: { xs: "20px", md: "28px" },
            opacity: 0.6,
            animation: `${floatMedium} 6s ease-in-out infinite`,
            transform: `translate(${mousePosition.x * 0.2}px, ${
              mousePosition.y * 0.2
            }px)`,
            transition: "transform 0.3s ease-out",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: {
                xs: "10px solid transparent",
                md: "14px solid transparent",
              },
              borderRight: {
                xs: "10px solid transparent",
                md: "14px solid transparent",
              },
              borderBottom: {
                xs: "20px solid rgba(255, 255, 255, 0.04)",
                md: "28px solid rgba(255, 255, 255, 0.04)",
              },
            },
          }}
        />

        {/* Hexagon - representing community and connection */}
        <Box
          sx={{
            position: "absolute",
            top: "65%",
            left: { xs: "3%", md: "5%" },
            width: { xs: "22px", md: "30px" },
            height: { xs: "22px", md: "30px" },
            opacity: 0.5,
            animation: `${floatFast} 7s ease-in-out infinite`,
            transform: `translate(${mousePosition.x * 0.1}px, ${
              mousePosition.y * 0.1
            }px)`,
            transition: "transform 0.3s ease-out",
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        />

        {/* Connecting lines */}
        <Box
          sx={{
            position: "absolute",
            top: "25%",
            left: { xs: "6%", md: "10%" },
            width: { xs: "30px", md: "50px" },
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)",
            transform: "rotate(35deg)",
            animation: `${pulse} 4s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "55%",
            left: { xs: "8%", md: "12%" },
            width: { xs: "25px", md: "40px" },
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.04), transparent)",
            transform: "rotate(-25deg)",
            animation: `${pulse} 5s ease-in-out infinite`,
          }}
        />
      </Box>

      {/* Right Side Floating Elements - Geometric Shapes */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: { xs: "150px", md: "250px", lg: "300px" },
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {/* Diamond - representing clarity and purpose */}
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            right: { xs: "8%", md: "12%" },
            width: { xs: "20px", md: "28px" },
            height: { xs: "20px", md: "28px" },
            opacity: 0.6,
            animation: `${floatMedium} 9s ease-in-out infinite`,
            transform: `translate(${-mousePosition.x * 0.15}px, ${
              mousePosition.y * 0.15
            }px) rotate(45deg)`,
            transition: "transform 0.3s ease-out",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        />

        {/* Oval - representing growth and potential */}
        <Box
          sx={{
            position: "absolute",
            top: "45%",
            right: { xs: "10%", md: "15%" },
            width: { xs: "28px", md: "36px" },
            height: { xs: "18px", md: "24px" },
            opacity: 0.5,
            animation: `${floatSlow} 7s ease-in-out infinite`,
            transform: `translate(${-mousePosition.x * 0.2}px, ${
              mousePosition.y * 0.2
            }px)`,
            transition: "transform 0.3s ease-out",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        />

        {/* Star - representing hope and guidance */}
        <Box
          sx={{
            position: "absolute",
            top: "70%",
            right: { xs: "5%", md: "8%" },
            width: { xs: "18px", md: "24px" },
            height: { xs: "18px", md: "24px" },
            opacity: 0.7,
            animation: `${floatFast} 6s ease-in-out infinite`,
            transform: `translate(${-mousePosition.x * 0.1}px, ${
              mousePosition.y * 0.1
            }px)`,
            transition: "transform 0.3s ease-out",
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          }}
        />

        {/* Connecting lines */}
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            right: { xs: "8%", md: "12%" },
            width: { xs: "35px", md: "55px" },
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)",
            transform: "rotate(-35deg)",
            animation: `${pulse} 4.5s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            right: { xs: "10%", md: "15%" },
            width: { xs: "28px", md: "45px" },
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.04), transparent)",
            transform: "rotate(25deg)",
            animation: `${pulse} 5.5s ease-in-out infinite`,
          }}
        />
      </Box>

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
              mb: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <img
              src="/assets/logo.png"
              alt="Smaran Foundation Logo"
              style={{
                height: isMobile ? 100 : 150,
                width: isMobile ? 100 : 150,
                borderRadius: "50%",
                objectFit: "cover",
                filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))",
                transition: "all 0.3s ease-in-out",
                border: "3px solid rgba(255, 255, 255, 0.8)",
                boxShadow: "0 0 0 2px rgba(212, 165, 116, 0.6)",
              }}
            />
          </Box>

          {/* Tagline */}
          <Typography
            variant={isMobile ? "h6" : "h4"}
            component="p"
            className={`${styles.tagline} ${
              isVisible ? "fade-in visible" : "fade-in"
            }`}
            sx={{
              mb: 6,
              opacity: 0.95,
              fontStyle: "italic",
              fontWeight: 300,
              animationDelay: "0.1s",
              fontSize: isMobile ? "1.25rem" : "1.75rem",
              lineHeight: 1.4,
              letterSpacing: "0.5px",
            }}
          >
            "To remember is to care, and to care is to love..."
          </Typography>

          <Typography
            variant={isMobile ? "h4" : "h2"}
            component="h1"
            className={`${styles.title} ${
              isVisible ? "fade-in visible" : "fade-in"
            }`}
            sx={{
              fontWeight: 700,
              mb: 4,
              background: `linear-gradient(135deg, #ffffff 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animationDelay: "0.2s",
              fontSize: isMobile ? "2rem" : "3rem",
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            Welcome to Smaran Foundation
          </Typography>

          {/* Founder's Message */}
          <Typography
            variant={isMobile ? "body1" : "h6"}
            component="p"
            className={`${styles.founderMessage} ${
              isVisible ? "fade-in visible" : "fade-in"
            }`}
            sx={{
              mb: 4,
              opacity: 0.95,
              lineHeight: 1.6,
              fontWeight: 300,
              animationDelay: "0.25s",
              fontSize: isMobile ? "1rem" : "1.1rem",
              maxWidth: "700px",
              mx: "auto",
              fontStyle: "italic",
            }}
          >
            "In a world that's increasingly fragmented, our objective is to
            build bridges — between knowledge and people, between rights and
            reach, between care and access. For us, this means not just working
            for the community, but with it — listening as much as we speak,
            learning as much as we teach.
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h6"}
            component="p"
            className={`${styles.subtitle} ${
              isVisible ? "fade-in visible" : "fade-in"
            }`}
            sx={{
              mb: 2,
              opacity: 0.9,
              lineHeight: 1.6,
              fontWeight: 300,
              animationDelay: "0.3s",
              fontSize: isMobile ? "1.1rem" : "1.25rem",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Smaran is "In Remembrance" - of every soul worthy of Dignity,
            Compassion, and Love."
          </Typography>

          <Typography
            variant="body2"
            component="p"
            className={`${styles.attribution} ${
              isVisible ? "fade-in visible" : "fade-in"
            }`}
            sx={{
              mb: 6,
              opacity: 0.8,
              fontStyle: "italic",
              fontWeight: 300,
              animationDelay: "0.35s",
              fontSize: isMobile ? "0.9rem" : "1rem",
              textAlign: "right",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            ~ From the Founder's Desk
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
