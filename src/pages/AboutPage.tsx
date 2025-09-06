import React from "react";
import { Box, Container, Typography } from "@mui/material";
import About from "@components/About/About";

const AboutPage: React.FC = () => {
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
          About Smaran Foundation
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 8, color: "text.secondary", maxWidth: "800px", mx: "auto" }}
        >
          Learn about our mission, our team, and the values that drive our
          commitment to building a more inclusive and compassionate society.
        </Typography>
      </Container>
      <About />
    </Box>
  );
};

export default AboutPage;
