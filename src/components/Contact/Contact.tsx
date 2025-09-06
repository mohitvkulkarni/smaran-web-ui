import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Email, LocationOn, Phone, Schedule } from "@mui/icons-material";
import styles from "./Contact.module.scss";

const Contact: React.FC = () => {
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

  const contactInfo = [
    {
      icon: (
        <Email sx={{ fontSize: 32, color: theme.palette.secondary.main }} />
      ),
      title: "Email Us",
      content: "info@smaranfoundation.com",
      action: () => window.open("mailto:info@smaranfoundation.com"),
    },
    {
      icon: (
        <LocationOn
          sx={{ fontSize: 32, color: theme.palette.secondary.main }}
        />
      ),
      title: "Visit Us",
      content: "Bangalore, Karnataka, India",
      action: null,
    },
    {
      icon: (
        <Phone sx={{ fontSize: 32, color: theme.palette.secondary.main }} />
      ),
      title: "Call Us",
      content: "+91-9663038407 / +91-8217492013",
      action: () => window.open("tel:+919663038407"),
    },
    {
      icon: (
        <Schedule sx={{ fontSize: 32, color: theme.palette.secondary.main }} />
      ),
      title: "Office Hours",
      content: "Monday - Friday: 9:00 AM - 6:00 PM",
      action: null,
    },
  ];

  return (
    <Box
      id="contact"
      ref={sectionRef}
      className={`${styles.contact} section-padding`}
      sx={{
        backgroundColor: "white",
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
            Get In Touch
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
            For queries, associations, and other information, contact us at{" "}
            <a
              href="mailto:info@smaranfoundation.com"
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              info@smaranfoundation.com
            </a>{" "}
            or call us at our Indian office @ +91-9663038407 / +91-8217492013 or
            submit a message below. One of us will get in touch.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={info.title}>
              <Card
                className={`${styles.contactCard} ${
                  isVisible ? "fade-in visible" : "fade-in"
                }`}
                onClick={info.action || undefined}
                sx={{
                  height: "100%",
                  textAlign: "center",
                  p: 2,
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease-in-out",
                  animationDelay: `${index * 0.1}s`,
                  cursor: info.action ? "pointer" : "default",
                  "&:hover": {
                    transform: info.action
                      ? "translateY(-8px)"
                      : "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2 }}>{info.icon}</Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      mb: 2,
                    }}
                  >
                    {info.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {info.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            textAlign: "center",
            p: 6,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 3,
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
          className={`${styles.ctaSection} ${
            isVisible ? "fade-in visible" : "fade-in"
          }`}
        >
          <Box className={styles.ctaPattern} />
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h3"
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              Ready to Make a Difference?
            </Typography>

            <Typography
              variant="h6"
              component="p"
              sx={{
                mb: 4,
                opacity: 0.9,
                lineHeight: 1.6,
                fontWeight: 300,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Join us in our mission to create positive change in communities
              across India. Every contribution, big or small, makes a meaningful
              impact.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => window.open("mailto:info@smaranfoundation.com")}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                backgroundColor: theme.palette.secondary.main,
                color: "white",
                borderRadius: 3,
                boxShadow: "0 8px 25px rgba(244, 162, 97, 0.3)",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                  boxShadow: "0 12px 35px rgba(244, 162, 97, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease-in-out",
              }}
            >
              Contact Us Today
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            p: 4,
            backgroundColor: theme.palette.background.default,
            borderRadius: 3,
          }}
          className={`${styles.note} ${
            isVisible ? "fade-in visible" : "fade-in"
          }`}
        >
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            We value meaningful connections and thoughtful collaboration. When
            you reach out, you're not just contacting an organization—you're
            connecting with people who genuinely care about making a positive
            impact in our communities.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
