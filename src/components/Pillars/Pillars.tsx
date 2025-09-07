import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  School,
  Accessible,
  Psychology,
  Woman,
  Elderly,
  Nature,
} from "@mui/icons-material";
import { PILLARS } from "../../constants";
import styles from "./Pillars.module.scss";

const Pillars: React.FC = () => {
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

    return () => observer.disconnect();
  }, []);

  const icons = [
    <School sx={{ fontSize: 48, color: theme.palette.secondary.main }} />,
    <Accessible sx={{ fontSize: 48, color: theme.palette.secondary.main }} />,
    <Psychology sx={{ fontSize: 48, color: theme.palette.secondary.main }} />,
    <Woman sx={{ fontSize: 48, color: theme.palette.secondary.main }} />,
    <Elderly sx={{ fontSize: 48, color: theme.palette.secondary.main }} />,
    <Nature sx={{ fontSize: 48, color: theme.palette.secondary.main }} />,
  ];

  return (
    <Box
      id="pillars"
      ref={sectionRef}
      className={`${styles.pillars} section-padding`}
      sx={{
        backgroundColor: theme.palette.background.default,
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            component="h2"
            className={`${styles.title} ${
              isVisible ? "fade-in visible" : "fade-in"
            }`}
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
              mb: 3,
            }}
          >
            Six Areas of Focus
          </Typography>

          <Typography
            variant="h6"
            component="p"
            className={`${styles.subtitle} ${
              isVisible ? "fade-in visible" : "fade-in"
            }`}
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: "800px",
              mx: "auto",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            These six pillars guide our work and define our commitment to
            creating meaningful change in communities across India.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {PILLARS.map((pillar, index) => (
            <Grid item xs={12} md={6} lg={4} key={pillar.title}>
              <Card
                className={`${styles.pillarCard} ${
                  isVisible ? "fade-in visible" : "fade-in"
                }`}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease-in-out",
                  animationDelay: `${index * 0.1}s`,
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                  },
                  "&:hover .pillar-icon": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                }}
              >
                <Box className={styles.cardGradient} />
                <CardContent sx={{ p: 3, position: "relative", zIndex: 2 }}>
                  <Box
                    className="pillar-icon"
                    sx={{
                      mb: 2,
                      transition: "transform 0.3s ease-in-out",
                    }}
                  >
                    {icons[index]}
                  </Box>

                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {pillar.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.secondary.main,
                      fontStyle: "italic",
                      fontWeight: 500,
                      mb: 2,
                      fontSize: "0.95rem",
                    }}
                  >
                    "{pillar.quote}"
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {pillar.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            p: 4,
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
          className={`${styles.callToAction} ${
            isVisible ? "fade-in visible" : "fade-in"
          }`}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="p"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 500,
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            Together, We Can Make a Difference
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
            }}
          >
            Each of these principles represents not just our commitment, but an
            invitation for you to join us in creating positive change in our
            communities.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Pillars;
