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
      <Welcome />

      {/* Compassion in Action Section */}
      <Box
        sx={{
          py: 6,
          backgroundColor: theme.palette.secondary.main,
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
              fontStyle: "italic",
            }}
          >
            Compassion in Action. Change that Lasts.
          </Typography>
        </Container>
      </Box>

      <MissionVision />
      <Pillars />
    </Box>
  );
};

export default HomePage;
