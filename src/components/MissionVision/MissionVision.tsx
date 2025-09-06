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
import { Visibility, TrackChanges } from "@mui/icons-material";
import styles from "./MissionVision.module.scss";

const MissionVision: React.FC = () => {
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

  return (
    <Box
      ref={sectionRef}
      className={`${styles.missionVision} section-padding`}
      sx={{
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Card
              className={`${styles.missionCard} ${
                isVisible ? "slide-in-left visible" : "slide-in-left"
              }`}
              sx={{
                p: 4,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: "white",
                boxShadow: "0 12px 40px rgba(46, 82, 102, 0.2)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box className={styles.cardPattern} />
              <CardContent sx={{ position: "relative", zIndex: 2, p: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <TrackChanges
                    sx={{
                      fontSize: 40,
                      mr: 2,
                      color: theme.palette.secondary.main,
                    }}
                  />
                  <Typography
                    variant={isMobile ? "h5" : "h4"}
                    component="h2"
                    sx={{ fontWeight: 600 }}
                  >
                    Our Mission
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    fontSize: "1.1rem",
                    opacity: 0.95,
                  }}
                >
                  To build an inclusive and compassionate society by addressing
                  the unmet needs of marginalized communities — through
                  awareness, grassroots engagement, and insights and data-based
                  action in the areas of education, disability, mental health,
                  children and women's empowerment, elder care, and sustainable
                  development.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    fontSize: "1.1rem",
                    opacity: 0.95,
                    mt: 2,
                  }}
                >
                  We are committed to listening first, learning continuously,
                  and creating sustainable pathways to dignity and opportunity
                  for all — especially those often left behind.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              className={`${styles.visionCard} ${
                isVisible ? "slide-in-right visible" : "slide-in-right"
              }`}
              sx={{
                p: 4,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                color: "white",
                boxShadow: "0 12px 40px rgba(244, 162, 97, 0.2)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box className={styles.cardPattern} />
              <CardContent sx={{ position: "relative", zIndex: 2, p: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Visibility sx={{ fontSize: 40, mr: 2, color: "white" }} />
                  <Typography
                    variant={isMobile ? "h5" : "h4"}
                    component="h2"
                    sx={{ fontWeight: 600 }}
                  >
                    Our Vision
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    fontSize: "1.1rem",
                    opacity: 0.95,
                  }}
                >
                  A world where every individual, regardless of circumstance,
                  can live with dignity, access opportunity, and feel seen.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    fontSize: "1.1rem",
                    opacity: 0.95,
                    mt: 2,
                  }}
                >
                  We envision communities where children learn without barriers,
                  women lead without fear, the elderly age with respect, and no
                  one is excluded because of disability or mental health
                  struggles.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MissionVision;
