import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
} from "@mui/material";

const ProjectsPage: React.FC = () => {
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
          Our Projects
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 8, color: "text.secondary", maxWidth: "800px", mx: "auto" }}
        >
          We are currently developing impactful projects that align with our
          core principles. Stay tuned for updates on our upcoming initiatives.
        </Typography>

        <Card
          sx={{
            maxWidth: "600px",
            mx: "auto",
            textAlign: "center",
            py: 6,
            background: "linear-gradient(135deg, #1B365D 0%, #4A6FA5 100%)",
            color: "white",
          }}
        >
          <CardContent>
            <Chip
              label="Coming Soon"
              sx={{
                mb: 3,
                backgroundColor: "secondary.main",
                color: "primary.main",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            />
            <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
              Exciting Projects in Development
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "rgba(255, 255, 255, 0.9)" }}
            >
              We are working on meaningful projects that will directly impact
              the communities we serve. Our upcoming initiatives will focus on
              education, mental health awareness, disability inclusion, women's
              empowerment, and environmental sustainability.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ProjectsPage;
