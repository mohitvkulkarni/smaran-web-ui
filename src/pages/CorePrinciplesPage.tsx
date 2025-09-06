import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Pillars from "@components/Pillars/Pillars";

const CorePrinciplesPage: React.FC = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{ mb: 6, color: "primary.main" }}
        >
          Our Foundational Pillars
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 8, color: "text.secondary", maxWidth: "800px", mx: "auto" }}
        >
          These core principles guide our mission and shape every initiative we
          undertake. Each pillar represents our commitment to creating lasting,
          meaningful change in the communities we serve.
        </Typography>
      </Container>
      <Pillars />
    </Box>
  );
};

export default CorePrinciplesPage;
