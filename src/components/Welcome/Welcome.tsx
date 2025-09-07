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
import { Favorite, People, School, EmojiObjects } from "@mui/icons-material";
import styles from "./Welcome.module.scss";

const Welcome: React.FC = () => {
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

  const values = [
    {
      icon: (
        <Favorite sx={{ fontSize: 40, color: theme.palette.secondary.main }} />
      ),
      title: "Compassion",
      description:
        "We approach every challenge with empathy and understanding, recognizing the dignity in every individual.",
    },
    {
      icon: (
        <People sx={{ fontSize: 40, color: theme.palette.secondary.main }} />
      ),
      title: "Community",
      description:
        "We believe in the power of collective action and building strong, supportive communities.",
    },
    {
      icon: (
        <School sx={{ fontSize: 40, color: theme.palette.secondary.main }} />
      ),
      title: "Education",
      description:
        "Knowledge is the foundation of empowerment. We strive to make quality education accessible to all.",
    },
    {
      icon: (
        <EmojiObjects
          sx={{ fontSize: 40, color: theme.palette.secondary.main }}
        />
      ),
      title: "Innovation",
      description:
        "We embrace creative solutions and innovative approaches to address complex social challenges.",
    },
  ];

  return (
    <Box
      id="welcome"
      ref={sectionRef}
      className={`${styles.welcome} section-padding`}
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
            About Our Foundation
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
              lineHeight: { xs: 1.8, md: 1.7 },
              fontWeight: 300,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              mb: 4,
            }}
          >
            Smaran Foundation is a Bangalore-based Charitable Trust committed to
            nurturing dignity, inclusion, and opportunity for all. We focus on
            empowering the underprivileged through education, advocating for
            mental health and well-being, supporting individuals with
            disabilities, championing women's empowerment, environmental
            sustainability and offering compassionate disability and geriatric
            care.
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
              lineHeight: { xs: 1.8, md: 1.7 },
              fontWeight: 300,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              mb: 4,
            }}
          >
            Rooted in empathy and driven by action, our programs touch lives
            where it matters most — from classrooms to care homes, from urban
            slums to rural villages. We believe that sustainable change begins
            with collective effort — and you are a part of that story.
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
              lineHeight: { xs: 1.8, md: 1.7 },
              fontWeight: 300,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
            }}
          >
            Join us in building a society where no one is left behind. Feel free
            to contact us at anytime!
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={value.title}>
              <Card
                className={`${styles.valueCard} ${
                  isVisible ? "fade-in visible" : "fade-in"
                }`}
                sx={{
                  height: "100%",
                  textAlign: "center",
                  p: 2,
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease-in-out",
                  animationDelay: `${index * 0.1}s`,
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2 }}>{value.icon}</Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      mb: 2,
                    }}
                  >
                    {value.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {value.description}
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
            backgroundColor: theme.palette.primary.main,
            borderRadius: 3,
            color: "white",
          }}
          className={`${styles.missionStatement} ${
            isVisible ? "fade-in visible" : "fade-in"
          }`}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="p"
            sx={{
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            "Our mission is to create a society where every individual has the
            opportunity to live with dignity, access quality education and
            healthcare, and contribute meaningfully to their community."
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Welcome;
