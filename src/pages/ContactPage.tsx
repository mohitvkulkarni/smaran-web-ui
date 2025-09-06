import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Contact from "@components/Contact/Contact";

const ContactPage: React.FC = () => {
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
          Get in Touch
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 8, color: "text.secondary", maxWidth: "800px", mx: "auto" }}
        >
          We'd love to hear from you. Whether you're interested in volunteering,
          collaborating, or simply want to learn more about our work, don't
          hesitate to reach out.
        </Typography>
      </Container>
      <Contact />
    </Box>
  );
};

export default ContactPage;
