import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import Hero from "@components/Hero/Hero";
import Welcome from "@components/Welcome/Welcome";
import MissionVision from "@components/MissionVision/MissionVision";
import Pillars from "@components/Pillars/Pillars";

const HomePage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Hero />

      {/* Compassion in Action Section */}
      <Box
        sx={{
          py: 10,
          backgroundColor: theme.palette.secondary.main,
          color: "white",
          textAlign: "center",
          mt: 4,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 600,
              fontStyle: "italic",
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1.2,
            }}
          >
            Compassion in Action. Change that Lasts.
          </Typography>
        </Container>
      </Box>

      <MissionVision />
      <Pillars />
      <Welcome />
    </Box>
  );
};

export default HomePage;
